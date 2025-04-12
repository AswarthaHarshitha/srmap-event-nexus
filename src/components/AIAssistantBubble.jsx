
import { useState, useEffect } from 'react';
import { useAIAssistant } from '@/contexts/AIAssistantContext';
import { Bot, X, MessageSquare, MinusCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const AIAssistantBubble = () => {
  const { 
    isOpen, 
    openAssistant, 
    closeAssistant, 
    messages, 
    sendMessage, 
    isLoading 
  } = useAIAssistant();
  const [userInput, setUserInput] = useState('');
  const [minimized, setMinimized] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage(userInput);
      setUserInput('');
    }
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleFullAssistant = () => {
    closeAssistant();
    navigate('/assistant');
  };

  return (
    <>
      {/* Assistant Bubble Button */}
      {!isOpen && (
        <button
          onClick={openAssistant}
          className="fixed bottom-6 right-6 rounded-full bg-srm-green text-white w-14 h-14 flex items-center justify-center shadow-lg hover:bg-srm-green-dark transition-colors z-50"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            minimized ? 'w-[300px] h-12' : 'w-[350px] sm:w-[380px]'
          }`}
        >
          <Card className="shadow-xl border-gray-200 overflow-hidden h-full">
            {minimized ? (
              <div className="bg-srm-green text-white p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  <span className="font-medium">EVENTSPHERE Assistant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button onClick={toggleMinimize} className="text-white hover:text-gray-200 p-1">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button onClick={closeAssistant} className="text-white hover:text-gray-200 p-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-srm-green text-white p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    <span className="font-medium">EVENTSPHERE Assistant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button onClick={toggleMinimize} className="text-white hover:text-gray-200 p-1">
                      <MinusCircle className="h-4 w-4" />
                    </button>
                    <button onClick={closeAssistant} className="text-white hover:text-gray-200 p-1">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="h-64 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
                  {messages.slice(-4).map((msg, index) => (
                    <div 
                      key={index}
                      className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div 
                        className={`inline-block p-2 rounded-lg max-w-[85%] ${
                          msg.role === 'user' 
                            ? 'bg-srm-green text-white rounded-tr-none'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex">
                    <Input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow mr-2"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      size="sm" 
                      disabled={isLoading || !userInput.trim()}
                      className="bg-srm-green hover:bg-srm-green-dark"
                    >
                      Send
                    </Button>
                  </div>
                  
                  <div className="mt-2 text-center">
                    <button 
                      type="button"
                      onClick={handleFullAssistant}
                      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      Open full assistant
                    </button>
                  </div>
                </form>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default AIAssistantBubble;
