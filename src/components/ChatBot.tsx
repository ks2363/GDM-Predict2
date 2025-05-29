
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, X, AlertCircle, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { sendChatMessage, checkChatbotHealth } from "@/services/chatbotService";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: "user" | "assistant", content: string, source?: "api" | "web"}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isApiAvailable, setIsApiAvailable] = useState<boolean | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check if the chatbot service is available
  useEffect(() => {
    const checkHealth = async () => {
      const healthStatus = await checkChatbotHealth();
      setIsOnline(healthStatus.isHealthy);
      setIsApiAvailable(healthStatus.apiAvailable);
    };
    checkHealth();
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = message.trim();
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setIsLoading(true);
    
    try {
      const response = await sendChatMessage(userMessage);
      
      if (response) {
        // Check if API is available to determine source
        const source = isApiAvailable ? "api" : "web";
        
        // Add assistant response to chat
        setChatHistory((prev) => [...prev, { 
          role: "assistant", 
          content: response,
          source
        }]);
      }
    } catch (error) {
      toast.error("Failed to get response from the chatbot");
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-gdm-blue hover:bg-gdm-blue/90"
          aria-label="Open Chat"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full md:w-96 h-[500px] md:h-[600px] md:bottom-8 md:right-8 bg-white rounded-t-lg md:rounded-lg shadow-xl flex flex-col border border-gray-200">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-gdm-blue text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <h2 className="font-medium">GDM Assistant</h2>
              
              {isOnline !== null && (
                <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-500'}`}></span>
              )}
              
              {isOnline && !isApiAvailable && (
                <span className="text-xs bg-amber-600 px-1.5 py-0.5 rounded">Web mode</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-gdm-blue/90"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef} 
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gdm-gray">
                <Bot className="h-12 w-12 mb-3 text-gdm-blue opacity-70" />
                <h3 className="text-lg font-medium text-gdm-charcoal">GDM Assistant</h3>
                <p className="mt-2">
                  Ask me anything about Gestational Diabetes Mellitus. I'm here to help!
                </p>
                {isOnline && !isApiAvailable && (
                  <div className="mt-3 text-xs flex items-center text-amber-600">
                    <Globe className="h-3 w-3 mr-1" />
                    <span>Using web information (AI API unavailable)</span>
                  </div>
                )}
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-gdm-blue text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === 'assistant' && msg.source === 'web' && (
                      <div className="mt-2 text-xs flex items-center text-amber-600">
                        <Globe className="h-3 w-3 mr-1" />
                        <span>Web information</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Service Offline Warning */}
          {isOnline === false && (
            <div className="p-3 bg-red-50 border-t border-red-200">
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <p>Chat service is currently offline. Please try again later.</p>
              </div>
            </div>
          )}

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1"
                disabled={isLoading || isOnline === false}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !message.trim() || isOnline === false}
                className="bg-gdm-blue hover:bg-gdm-blue/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
