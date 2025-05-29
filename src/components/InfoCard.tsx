
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
}

const InfoCard = ({ title, icon, children, delay = 0 }: InfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="glass-card p-6 h-full"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gdm-light-blue flex items-center justify-center text-gdm-blue">
          {icon}
        </div>
        <h3 className="text-xl font-display font-medium text-gdm-dark-charcoal">{title}</h3>
      </div>
      <div className="space-y-4 text-gdm-gray">
        {children}
      </div>
    </motion.div>
  );
};

export default InfoCard;
