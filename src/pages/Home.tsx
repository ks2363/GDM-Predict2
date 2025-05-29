
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Activity, Heart, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PageTransition from '@/components/PageTransition';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Navbar />
      
      <main className="min-h-screen">
        <HeroSection />
        
        {/* Why Early Detection Matters */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 text-sm font-medium text-gdm-blue bg-gdm-light-blue rounded-full mb-4"
            >
              Why It Matters
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-semibold text-gdm-dark-charcoal mb-6"
            >
              Early Detection Is Crucial
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-gdm-gray text-lg"
            >
              Gestational Diabetes Mellitus affects both mother and baby. Detecting it early helps prevent complications and enables proactive health management.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Protect Your Health",
                description: "Early detection significantly reduces the risk of pregnancy complications, including preeclampsia and cesarean delivery."
              },
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: "Prevent Complications",
                description: "Undiagnosed GDM can lead to large birth weight babies, birth injuries, and increased risk of neonatal hypoglycemia."
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Long-Term Benefits",
                description: "Managing GDM early reduces the risk of both mother and child developing type 2 diabetes later in life."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-gdm-light-blue flex items-center justify-center text-gdm-blue mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-medium text-gdm-dark-charcoal mb-3">{item.title}</h3>
                <p className="text-gdm-gray">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gdm-light-blue bg-opacity-30 -z-10" />
          <div className="absolute top-0 left-0 h-64 w-64 bg-gdm-light-blue opacity-40 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 h-64 w-64 bg-gdm-light-blue opacity-40 rounded-full blur-3xl -z-10 transform translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-gdm-dark-charcoal">
                    Ready to Check Your GDM Risk?
                  </h2>
                  <p className="text-gdm-gray text-lg">
                    Our prediction tool uses your health data to assess your risk for Gestational Diabetes Mellitus and provides personalized recommendations.
                  </p>
                  <div className="pt-4">
                    <Link 
                      to="/prediction" 
                      className="inline-flex items-center btn-primary"
                    >
                      <span>Start Risk Assessment</span>
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  {[
                    "Takes only 2-3 minutes to complete",
                    "Uses clinically relevant health markers",
                    "Provides personalized health recommendations",
                    "Completely private and secure"
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center p-4 bg-white rounded-lg shadow-subtle"
                    >
                      <div className="w-8 h-8 rounded-full bg-gdm-light-blue flex items-center justify-center mr-4">
                        <CheckCircle size={16} className="text-gdm-blue" />
                      </div>
                      <p className="text-gdm-charcoal">{feature}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Learn More Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-semibold text-gdm-dark-charcoal mb-6"
            >
              Learn More About GDM
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-gdm-gray text-lg"
            >
              Understanding gestational diabetes is the first step toward managing your health during pregnancy.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-gdm-light-blue flex items-center justify-center text-gdm-blue mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-medium text-gdm-dark-charcoal mb-3">What is GDM?</h3>
              <p className="text-gdm-gray mb-6">
                Gestational Diabetes Mellitus is a form of diabetes that develops during pregnancy. It affects how your cells use sugar (glucose) and can cause high blood sugar that can affect your pregnancy and your baby's health.
              </p>
              <div className="mt-auto pt-4">
                <Link 
                  to="/information" 
                  className="inline-flex items-center text-gdm-blue hover:text-gdm-dark-blue transition-colors duration-300"
                >
                  <span>Read more</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-6 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-gdm-light-blue flex items-center justify-center text-gdm-blue mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-medium text-gdm-dark-charcoal mb-3">Prevention Tips</h3>
              <p className="text-gdm-gray mb-6">
                While some risk factors for gestational diabetes are beyond your control, maintaining a healthy lifestyle before and during pregnancy can help prevent GDM or reduce its impact.
              </p>
              <div className="mt-auto pt-4">
                <Link 
                  to="/information" 
                  className="inline-flex items-center text-gdm-blue hover:text-gdm-dark-blue transition-colors duration-300"
                >
                  <span>Discover prevention strategies</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

export default Home;
