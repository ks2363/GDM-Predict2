
import { motion } from 'framer-motion';
import { AlertCircle, Activity, Utensils, Award } from 'lucide-react';

// Risk level types and colors
const riskLevels = {
  low: {
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
    message: 'Your risk profile suggests a low probability of developing GDM.',
  },
  moderate: {
    color: 'text-amber-500',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-200',
    message: 'Your risk profile suggests a moderate probability of developing GDM.',
  },
  high: {
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
    message: 'Your risk profile suggests a high probability of developing GDM.',
  },
};

interface ResultsCardProps {
  risk: 'low' | 'moderate' | 'high';
  confidenceScore: number;
  recommendations: {
    diet: string[];
    exercise: string[];
    lifestyle: string[];
  };
  onDownload: () => void;
}

const ResultsCard = ({ risk, confidenceScore, recommendations, onDownload }: ResultsCardProps) => {
  const riskInfo = riskLevels[risk];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 lg:p-8"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-2">Your GDM Risk Assessment</h2>
          <p className="text-gdm-gray">Based on the information you provided, here's your personalized risk assessment.</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`p-4 rounded-lg ${riskInfo.bgColor} ${riskInfo.borderColor} border`}
        >
          <div className="flex items-center space-x-3">
            <AlertCircle className={`w-6 h-6 ${riskInfo.color}`} />
            <span className={`font-medium ${riskInfo.color}`}>
              {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
            </span>
          </div>
          <p className="mt-2 text-gdm-charcoal">
            {riskInfo.message}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-4 bg-gdm-light-gray bg-opacity-50 rounded-lg"
        >
          <h3 className="text-sm font-medium text-gdm-dark-charcoal mb-2">Confidence Score</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gdm-blue h-2.5 rounded-full" 
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
          <p className="text-right mt-1 text-sm text-gdm-gray">{confidenceScore}%</p>
        </motion.div>
        
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Utensils className="w-5 h-5 text-gdm-blue" />
              <h3 className="text-lg font-medium text-gdm-dark-charcoal">Diet Recommendations</h3>
            </div>
            <ul className="space-y-2 pl-5">
              {recommendations.diet.map((item, index) => (
                <li key={`diet-${index}`} className="text-gdm-gray list-disc">{item}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-5 h-5 text-gdm-blue" />
              <h3 className="text-lg font-medium text-gdm-dark-charcoal">Exercise Recommendations</h3>
            </div>
            <ul className="space-y-2 pl-5">
              {recommendations.exercise.map((item, index) => (
                <li key={`exercise-${index}`} className="text-gdm-gray list-disc">{item}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-5 h-5 text-gdm-blue" />
              <h3 className="text-lg font-medium text-gdm-dark-charcoal">Lifestyle Changes</h3>
            </div>
            <ul className="space-y-2 pl-5">
              {recommendations.lifestyle.map((item, index) => (
                <li key={`lifestyle-${index}`} className="text-gdm-gray list-disc">{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="pt-4"
        >
          <button onClick={onDownload} className="btn-primary w-full">
            Download Detailed Report (PDF)
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsCard;
