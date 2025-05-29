
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gdm-light-gray py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4 font-display text-gdm-dark-charcoal">GDM Risk Prediction</h3>
            <p className="text-gdm-gray mb-4 max-w-md">
              A user-friendly application designed to help expectant mothers assess and manage their risk of Gestational Diabetes Mellitus.
            </p>
            <div className="flex items-center text-gdm-gray">
              <Heart size={16} className="mr-2 text-gdm-blue" />
              <p className="text-sm">Promoting maternal health and well-being</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4 font-display text-gdm-dark-charcoal">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gdm-gray hover:text-gdm-blue transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/prediction" className="text-gdm-gray hover:text-gdm-blue transition duration-300">Risk Prediction</Link>
              </li>
              <li>
                <Link to="/information" className="text-gdm-gray hover:text-gdm-blue transition duration-300">Information</Link>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-sm text-center text-gdm-gray">
            &copy; {currentYear} GDM Risk Prediction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
