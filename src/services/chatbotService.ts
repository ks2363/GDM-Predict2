
import { toast } from "sonner";

export const sendChatMessage = async (message: string): Promise<string | null> => {
  try {
    console.log("Sending chat message:", message);

    // Call API
    const response = await fetch('http://localhost:5002/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response from chatbot');
    }
    
    const result = await response.json();
    console.log("Received chatbot response", result);
    
    // Check if this is a web-scraped response and add a note if needed
    if (result.source === 'web') {
      console.log("Response from web scraping");
    }
    
    return result.response as string;
  } catch (error) {
    console.error("Chatbot error:", error);
    toast.error("Error connecting to chatbot. Please try again.");
    return null;
  }
};

export const checkChatbotHealth = async (): Promise<{isHealthy: boolean, apiAvailable: boolean}> => {
  try {
    const response = await fetch('http://localhost:5002/health');
    if (!response.ok) return { isHealthy: false, apiAvailable: false };
    
    const data = await response.json();
    return { 
      isHealthy: data.status === 'healthy',
      apiAvailable: data.api_status === 'available'
    };
  } catch (error) {
    console.error("Chatbot health check error:", error);
    return { isHealthy: false, apiAvailable: false };
  }
};
