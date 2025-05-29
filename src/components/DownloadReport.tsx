
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, AlertCircle } from 'lucide-react';

interface DownloadReportProps {
  risk: 'low' | 'moderate' | 'high';
  confidenceScore: number;
  formData: any;
  recommendations: {
    diet: string[];
    exercise: string[];
    lifestyle: string[];
  };
}

const DownloadReport = ({ risk, confidenceScore, formData, recommendations }: DownloadReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      // In a real app, this would generate and download a PDF
      // For now, we'll just show a simulation
      setIsGenerating(false);
      
      // Create a simple text file as a placeholder for the PDF
      const reportData = `
GDM Risk Assessment Report

Personal Information:
- Age: ${formData.age}
- BMI: ${formData.bmi}
- Blood Pressure: ${formData.bloodPressure}
- Glucose Levels: ${formData.glucoseLevels}
- Insulin Levels: ${formData.insulinLevels}
- Family History: ${formData.familyHistory}
- Physical Activity: ${formData.physicalActivity}
- Diet Type: ${formData.dietType}
- Additional Medical History: ${formData.medicalHistory || 'None provided'}

Assessment Result:
- Risk Level: ${risk.toUpperCase()}
- Confidence Score: ${confidenceScore}%

Recommendations:
1. Diet:
${recommendations.diet.map(item => `   - ${item}`).join('\n')}

2. Exercise:
${recommendations.exercise.map(item => `   - ${item}`).join('\n')}

3. Lifestyle Changes:
${recommendations.lifestyle.map(item => `   - ${item}`).join('\n')}

DISCLAIMER: This assessment is for educational purposes only and is not a substitute for professional medical advice.
Please consult with your healthcare provider for personalized medical guidance.
      `;
      
      const blob = new Blob([reportData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GDM_Risk_Assessment_Report.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="btn-primary w-full flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Report...
          </>
        ) : (
          <>
            <Download size={18} className="mr-2" />
            Download Detailed Report
          </>
        )}
      </button>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-700">
            This assessment is for educational purposes only and is not a substitute for professional medical advice.
            Please consult with your healthcare provider for personalized medical guidance.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DownloadReport;
