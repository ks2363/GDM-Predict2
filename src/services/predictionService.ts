
import { toast } from "sonner";

interface PredictionFormData {
  age: string;
  pregnancyCount: string;
  previousGestationPeriod: string;
  bmi: string;
  hdl: string;
  familyHistory: string;
  prenatalLoss: string;
  birthDefects: string;
  pcos: string;
  systolicBP: string;
  diastolicBP: string;
  glucoseLevels: string;
  hemoglobin: string;
  physicalActivity: string;
  prediabetes: string;
  [key: string]: string;
}

interface PredictionResult {
  prediction: string;
  isDiabetic: boolean;
  confidence: number;
  risk: 'low' | 'moderate' | 'high';
  rawPrediction: number;
}

export const submitPrediction = async (formData: PredictionFormData): Promise<PredictionResult | null> => {
  try {
    // Map form data to API expected format - directly using the form fields
    // since we've updated the form to match the API requirements
    const apiPayload = {
      age: formData.age,
      pregnancyCount: formData.pregnancyCount,
      previousGestationPeriod: formData.previousGestationPeriod,
      bmi: formData.bmi,
      hdl: formData.hdl,
      familyHistory: formData.familyHistory,
      prenatalLoss: formData.prenatalLoss,
      birthDefects: formData.birthDefects,
      pcos: formData.pcos,
      systolicBP: formData.systolicBP,
      diastolicBP: formData.diastolicBP,
      glucoseLevels: formData.glucoseLevels,
      hemoglobin: formData.hemoglobin,
      physicalActivity: formData.physicalActivity,
      prediabetes: formData.prediabetes
    };

    console.log("Sending prediction data:", apiPayload);

    // Call API
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get prediction');
    }
    
    const result = await response.json();
    console.log("Received prediction result:", result);
    return result as PredictionResult;
  } catch (error) {
    console.error("Prediction error:", error);
    toast.error("Error getting prediction. Please try again.");
    return null;
  }
};
