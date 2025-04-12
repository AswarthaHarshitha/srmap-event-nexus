
import { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

const AIAssistantContext = createContext();

export const AIAssistantProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm your EVENTSPHERE assistant. How can I help you today? 😊" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const openAssistant = () => setIsOpen(true);
  const closeAssistant = () => setIsOpen(false);
  
  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;
    
    // Add user message to the chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate AI responses with predefined answers
      const aiResponse = await simulateAIResponse(userMessage);
      
      // Add AI response to the chat
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "I couldn't process your request right now. Please try again later!",
        variant: "destructive",
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble responding right now. Could you try again later? 🙏" 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  // Simulate AI responses based on user input
  const simulateAIResponse = async (userMessage) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes("weekend") && userMessageLower.includes("near me")) {
      return "This weekend we have 3 events near SRM University! 🎉 There's a Tech Hackathon on Saturday, Cultural Dance performance on Saturday evening, and a Basketball tournament on Sunday. Would you like more details about any of these? 📅";
    }
    
    if (userMessageLower.includes("tech") && userMessageLower.includes("online")) {
      return "I found several online tech events for you! 💻\n\n• AI Workshop (Tuesday, 6pm)\n• Web Development Masterclass (Thursday, 7pm)\n• Cybersecurity Webinar (Friday, 5pm)\n\nAny of these catch your interest? I can help you register! ✨";
    }
    
    if (userMessageLower.includes("create") || userMessageLower.includes("organize")) {
      return "Sure, I'd be happy to help you create an event! 🚀 You can either go to your dashboard and click on 'Create Event', or tell me about your event and I can help fill in the details. What kind of event are you planning? 🤔";
    }
    
    if (userMessageLower.includes("register") || userMessageLower.includes("sign up")) {
      return "To register for an event, just go to the event page and click the 'Register Now' button! 🎟️ You'll receive a confirmation email with your ticket QR code. Is there a specific event you're interested in joining? 🎭";
    }
    
    // Generic response for other queries
    return "Thanks for your message! 🌟 I'm still learning, but I can help you find events, create your own event, or answer questions about EVENTSPHERE. Could you provide more details about what you're looking for? 😊";
  };
  
  // Provide event recommendations based on user preferences
  const getRecommendations = useCallback(async (userPreferences = {}) => {
    // This would be a real API call in production
    // For now returning mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: 101,
        title: "Tech Talk: Future of AI",
        date: "2025-05-20",
        matchScore: 97,
        reason: "Based on your interest in technology"
      },
      {
        id: 102,
        title: "Cultural Dance Festival",
        date: "2025-05-22",
        matchScore: 85,
        reason: "Similar to events you've attended"
      },
      {
        id: 103,
        title: "Engineering Workshop",
        date: "2025-05-25",
        matchScore: 78,
        reason: "Popular among SRM students"
      }
    ];
  }, []);
  
  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        openAssistant,
        closeAssistant,
        messages,
        sendMessage,
        isLoading,
        getRecommendations,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};
