
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResultsCard from '@/components/ResultsCard';
import EcgUploadForm from '@/components/EcgUploadForm';
import DownloadReport from '@/components/DownloadReport';
import PageTransition from '@/components/PageTransition';
import { submitEcgPrediction } from '@/services/ecgPredictionService';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';

const recommendationTemplates = {
  low: {
    diet: [
      "Focus on a balanced diet with plenty of fruits, vegetables, and whole grains",
      "Limit processed foods and added sugars",
      "Stay hydrated with water as your primary beverage"
    ],
    exercise: [
      "Maintain your current exercise routine of 150 minutes per week",
      "Include a mix of cardio and light strength training",
      "Consider activities like swimming or cycling that are gentle on joints"
    ],
    lifestyle: [
      "Continue regular health check-ups",
      "Monitor weight according to your healthcare provider's recommendations",
      "Ensure adequate sleep of 7-8 hours per night"
    ]
  },
  moderate: {
    diet: [
      "Follow a meal plan with controlled carbohydrate intake",
      "Eat smaller, more frequent meals throughout the day",
      "Choose complex carbohydrates with low glycemic index",
      "Include protein with each meal to stabilize blood sugar"
    ],
    exercise: [
      "Aim for 30 minutes of moderate activity daily",
      "Take short walks after meals to help regulate blood sugar",
      "Consider heart-friendly exercises under professional guidance"
    ],
    lifestyle: [
      "Monitor blood glucose levels periodically",
      "Practice stress-reduction techniques like meditation",
      "Keep a food and activity journal to identify patterns",
      "Schedule more frequent cardiac check-ups"
    ]
  },
  high: {
    diet: [
      "Work with a registered dietitian to create a specialized meal plan",
      "Carefully monitor carbohydrate intake and distribute evenly throughout the day",
      "Focus on high-fiber foods to help manage blood sugar",
      "Eliminate sugary beverages and desserts",
      "Time meals and snacks consistently to avoid blood sugar spikes"
    ],
    exercise: [
      "Consult with your healthcare provider before starting any exercise program",
      "Incorporate moderate activity as approved by your doctor",
      "Take short walks after each meal to help lower post-meal glucose levels",
      "Consider cardiac rehabilitation programs if recommended"
    ],
    lifestyle: [
      "Monitor blood glucose levels regularly",
      "Attend all recommended medical appointments and screenings",
      "Connect with a diabetes educator for personalized support",
      "Join a support group for patients with cardiac and diabetic conditions",
      "Prepare for possible medication therapy if recommended by your doctor"
    ]
  }
};

const EcgPrediction = () => {
  const [showResults, setShowResults] = useState(false);
  const [risk, setRisk] = useState<'low' | 'moderate' | 'high'>('low');
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [recommendations, setRecommendations] = useState(recommendationTemplates.low);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    age: "35",
    gender: "Male",
    testDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEcgSubmit = async (base64Image: string) => {
    setIsLoading(true);
    
    try {
      const result = await submitEcgPrediction(base64Image);
      
      if (result) {
        setRisk(result.risk);
        setConfidenceScore(result.confidence);
        setRecommendations(recommendationTemplates[result.risk]);
        setFormData({
          ...formData,
          ecgResult: result.prediction,
          confidenceScore: result.confidence,
        });
        setShowResults(true);
        
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 100);
      }
    } catch (error) {
      console.error("Error submitting ECG prediction:", error);
      toast.error("An error occurred while processing your ECG image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-gdm-dark-charcoal mb-4">
              <Heart className="inline-block mr-2 text-red-500" size={32} />
              ECG-Based Diabetes Risk Assessment
            </h1>
            <p className="max-w-2xl mx-auto text-gdm-gray text-lg">
              Upload an ECG image to assess potential diabetes risk using our advanced machine learning model.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {!showResults ? (
              <>
                <EcgUploadForm onSubmit={handleEcgSubmit} isLoading={isLoading} />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-card p-6 lg:p-8 h-fit"
                >
                  <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-6">About ECG Analysis</h2>
                  <div className="space-y-6 text-gdm-gray">
                    <p>
                      Our ECG-based diabetes risk assessment tool uses advanced deep learning techniques to analyze 
                      electrocardiogram patterns that may indicate early signs of diabetes or pre-diabetic conditions.
                    </p>
                    <p>
                      Research has shown that certain ECG abnormalities can be correlated with diabetes even before 
                      traditional symptoms appear, making this a valuable early screening tool.
                    </p>
                    <p>
                      After uploading your ECG image, our AI will analyze the waveform patterns and provide 
                      an assessment of potential diabetes risk based on recognized cardiac electrical patterns.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-6">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> This tool is for educational and screening purposes only. 
                        It does not replace proper medical diagnosis by healthcare professionals. Always consult 
                        with your doctor regarding any concerns about your health.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <ResultsCard 
                  risk={risk}
                  confidenceScore={confidenceScore}
                  recommendations={recommendations}
                  onDownload={() => {}}
                />
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card p-6 lg:p-8"
                  >
                    <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-6">Understanding Your ECG Results</h2>
                    <div className="space-y-4 text-gdm-gray">
                      <p>
                        Your risk assessment is based on the ECG patterns identified by our AI model that correlate with 
                        diabetes-related cardiac changes. The confidence score indicates the statistical certainty of this prediction.
                      </p>
                      <p>
                        {risk === 'low' && "A low risk result suggests that your ECG shows patterns typical of individuals without diabetes."}
                        {risk === 'moderate' && "A moderate risk result suggests some ECG patterns that may be associated with pre-diabetic or early diabetic changes."}
                        {risk === 'high' && "A high risk result indicates ECG patterns strongly associated with diabetes-related cardiac changes."}
                      </p>
                      <p>
                        It's important to follow up with appropriate clinical testing, as ECG analysis alone cannot 
                        diagnose diabetes. This tool provides an additional screening method that may detect early changes 
                        before they appear in standard tests.
                      </p>
                    </div>
                  </motion.div>
                  
                  <DownloadReport
                    risk={risk}
                    confidenceScore={confidenceScore}
                    formData={formData}
                    recommendations={recommendations}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 text-center"
                  >
                    <button
                      onClick={() => {
                        setShowResults(false);
                        
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }}
                      className="btn-secondary"
                    >
                      Upload Another ECG
                    </button>
                  </motion.div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default EcgPrediction;
