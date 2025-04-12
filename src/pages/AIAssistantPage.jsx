
import { useState, useRef, useEffect } from "react";
import { useAIAssistant } from "@/contexts/AIAssistantContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, Mic, User, Sparkles } from "lucide-react";

const AIAssistantPage = () => {
  const { messages, sendMessage, isLoading } = useAIAssistant();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Bot className="h-10 w-10 text-srm-green mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Event Assistant</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Ask me about events, get recommendations, or let me help plan your next event!
            </p>
          </div>
        </div>
        
        <Card className="mb-6 p-6 shadow-lg border-0 bg-gradient-to-r from-srm-green/5 to-srm-gold/5">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Sparkles className="h-5 w-5 text-srm-gold mr-2" /> What can I help you with?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="justify-start font-normal h-auto py-3 px-4 border-gray-200"
              onClick={() => sendMessage("What events are near me this weekend?")}
            >
              "What events are near me this weekend?"
            </Button>
            <Button 
              variant="outline"
              className="justify-start font-normal h-auto py-3 px-4 border-gray-200"
              onClick={() => sendMessage("Suggest fun tech events I can join online!")}
            >
              "Suggest fun tech events I can join online!"
            </Button>
            <Button 
              variant="outline"
              className="justify-start font-normal h-auto py-3 px-4 border-gray-200"
              onClick={() => sendMessage("Help me create a new event")}
            >
              "Help me create a new event"
            </Button>
            <Button 
              variant="outline"
              className="justify-start font-normal h-auto py-3 px-4 border-gray-200"
              onClick={() => sendMessage("How do I register for events?")}
            >
              "How do I register for events?"
            </Button>
          </div>
        </Card>
        
        <Card className="mb-6 p-6 border-0 shadow-lg min-h-[400px] flex flex-col">
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-srm-green text-white rounded-tr-none'
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.role === 'user' ? (
                      <>
                        <span className="font-medium">You</span>
                        <User className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4 mr-1 text-srm-green" />
                        <span className="font-medium">EVENTSPHERE Assistant</span>
                      </>
                    )}
                  </div>
                  <div className="whitespace-pre-line">{msg.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about events..."
              className="flex-grow mr-2"
              disabled={isLoading}
            />
            <Button 
              type="button"
              variant="outline"
              size="icon"
              className="mr-2" 
              disabled={isLoading}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistantPage;
