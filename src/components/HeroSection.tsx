
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative pt-24 pb-16 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gdm-light-blue/20 to-transparent -z-10" />
      <motion.div 
        className="absolute top-40 right-0 w-96 h-96 bg-gdm-light-blue/30 rounded-full blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium text-gdm-blue bg-gdm-light-blue rounded-full mb-4">
                  GDM Risk Assessment Tool
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-gdm-dark-charcoal mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Predict and Manage
                <br />
                <span className="text-gdm-blue">Gestational Diabetes</span>
                <br />
                Risk with Precision
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gdm-gray max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Early detection is the key to preventing complications for both mother and baby. 
                Our risk prediction tool helps you take control of your health during pregnancy.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link 
                to="/prediction" 
                className="inline-flex items-center btn-primary"
              >
                <span>Check Your Risk Now</span>
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/information" 
                className="inline-flex items-center btn-secondary"
              >
                Learn About GDM
              </Link>
            </motion.div>
            
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-sm text-gdm-gray">
                Based on medical research and designed for educational purposes.
                Not a substitute for professional medical advice.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-gdm-light-blue to-white shadow-subtle overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-white/20 backdrop-blur-sm rounded-2xl" />
              
              <div className="relative glass-card p-8 overflow-hidden">
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gdm-dark-charcoal">Key Benefits</h3>
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gdm-light-blue flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-5 h-5 text-gdm-blue" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { id: 1, text: "Early Detection & Prevention" },
                      { id: 2, text: "Personalized Risk Assessment" },
                      { id: 3, text: "Evidence-Based Recommendations" },
                      { id: 4, text: "Simple & User-Friendly Interface" },
                    ].map((benefit) => (
                      <motion.div 
                        key={benefit.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + benefit.id * 0.1 }}
                        className="flex items-center"
                      >
                        <div className="w-6 h-6 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3">
                          <Check className="w-3 h-3 text-gdm-blue" />
                        </div>
                        <p className="text-gdm-gray">{benefit.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-gdm-light-blue rounded-full opacity-30 blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// These components are needed for the HeroSection
const Heart = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default HeroSection;
