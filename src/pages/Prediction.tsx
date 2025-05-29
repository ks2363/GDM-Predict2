import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PredictionForm from '@/components/PredictionForm';
import ResultsCard from '@/components/ResultsCard';
import DownloadReport from '@/components/DownloadReport';
import PageTransition from '@/components/PageTransition';
import { submitPrediction } from '@/services/predictionService';
import { toast } from 'sonner';

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
      "Consider prenatal yoga or swimming as low-impact options"
    ],
    lifestyle: [
      "Continue regular prenatal check-ups",
      "Monitor weight gain according to your healthcare provider's recommendations",
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
      "Consider prenatal exercise classes under professional guidance"
    ],
    lifestyle: [
      "Monitor blood glucose levels as recommended by your healthcare provider",
      "Practice stress-reduction techniques like meditation",
      "Keep a food and activity journal to identify patterns",
      "Schedule more frequent prenatal check-ups"
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
      "Consider aquatic exercises for low-impact movement"
    ],
    lifestyle: [
      "Monitor blood glucose levels multiple times daily",
      "Attend all recommended medical appointments and screenings",
      "Connect with a diabetes educator for personalized support",
      "Join a support group for women with gestational diabetes",
      "Prepare for possible insulin therapy if recommended by your doctor"
    ]
  }
};

const Prediction = () => {
  const [formData, setFormData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [risk, setRisk] = useState<'low' | 'moderate' | 'high'>('low');
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [recommendations, setRecommendations] = useState(recommendationTemplates.low);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      const result = await submitPrediction(data);
      
      if (result) {
        setRisk(result.risk);
        setConfidenceScore(result.confidence);
        setRecommendations(recommendationTemplates[result.risk]);
        setFormData(data);
        setShowResults(true);
        
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 100);
      }
    } catch (error) {
      console.error("Error submitting prediction:", error);
      toast.error("An error occurred while processing your data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // This functionality is handled in the DownloadReport component
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
              GDM Risk Prediction
            </h1>
            <p className="max-w-2xl mx-auto text-gdm-gray text-lg">
              Enter your health details below to receive a personalized assessment of your gestational diabetes risk.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {!showResults ? (
              <>
                <PredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-card p-6 lg:p-8 h-fit"
                >
                  <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-6">About This Tool</h2>
                  <div className="space-y-6 text-gdm-gray">
                    <p>
                      Our GDM risk prediction tool uses your health data and a trained machine learning model to assess your 
                      likelihood of developing Gestational Diabetes Mellitus during pregnancy.
                    </p>
                    <p>
                      This assessment is based on clinical factors identified through medical research, including age, BMI, 
                      glucose levels, family history, and lifestyle factors.
                    </p>
                    <p>
                      After submission, you'll receive a personalized risk assessment along with recommendations 
                      tailored to your specific health profile.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-6">
                      <p className="text-sm text-yellow-700">
                        <strong>Disclaimer:</strong> This tool is for educational purposes only and is not a 
                        substitute for professional medical advice. Always consult with your healthcare provider 
                        regarding any concerns about your pregnancy or health.
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
                  onDownload={handleDownload}
                />
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card p-6 lg:p-8"
                  >
                    <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-6">Understanding Your Results</h2>
                    <div className="space-y-4 text-gdm-gray">
                      <p>
                        Your risk assessment is based on the information you provided and known risk factors for 
                        gestational diabetes. The confidence score indicates the statistical certainty of this prediction.
                      </p>
                      <p>
                        {risk === 'low' && "A low risk result suggests that you have few risk factors for GDM. However, regular prenatal care is still important."}
                        {risk === 'moderate' && "A moderate risk result indicates that you have some risk factors for GDM. Closer monitoring may be beneficial."}
                        {risk === 'high' && "A high risk result means you have multiple risk factors for GDM. We recommend discussing these results with your healthcare provider."}
                      </p>
                      <p>
                        Remember that this is a screening tool, not a diagnosis. Only a healthcare provider can 
                        diagnose gestational diabetes through proper medical testing.
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
                        setFormData(null);
                        
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }}
                      className="btn-secondary"
                    >
                      Return to Form
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

export default Prediction;
