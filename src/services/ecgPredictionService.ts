
import { toast } from "sonner";

interface EcgPredictionResult {
  prediction: string;
  isDiabetic: boolean;
  confidence: number;
  risk: 'low' | 'moderate' | 'high';
  rawPrediction: number;
}

export const submitEcgPrediction = async (imageBase64: string): Promise<EcgPredictionResult | null> => {
  try {
    console.log("Submitting ECG image for prediction...");
    
    // Call API
    const response = await fetch('http://localhost:5001/predict-ecg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageBase64 }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'Failed to get ECG prediction';
      console.error(`ECG prediction API error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    console.log("ECG prediction result received:", result);
    
    return result as EcgPredictionResult;
  } catch (error) {
    console.error("ECG prediction error:", error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      toast.error("Unable to connect to the ECG prediction service. Please ensure the server is running.");
    } else {
      toast.error(`Error analyzing ECG: ${error instanceof Error ? error.message : 'Please try again'}`);
    }
    
    return null;
  }
};

// Health check function to verify if the ECG prediction service is available
export const checkEcgServiceHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:5001/health', {
      method: 'GET',
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.status === 'healthy' && data.model_loaded === true;
    }
    
    return false;
  } catch (error) {
    console.error("ECG service health check failed:", error);
    return false;
  }
};
