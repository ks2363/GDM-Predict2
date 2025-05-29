
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Info, AlertTriangle, Heart, Activity, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InfoCard from '@/components/InfoCard';
import PageTransition from '@/components/PageTransition';

const Information = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-gdm-blue bg-gdm-light-blue rounded-full mb-4">
              Educational Resources
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-gdm-dark-charcoal mb-4">
              Understanding Gestational Diabetes
            </h1>
            <p className="max-w-2xl mx-auto text-gdm-gray text-lg">
              Learn about the causes, risk factors, and prevention strategies for managing gestational diabetes during pregnancy.
            </p>
          </motion.div>
          
          <section className="mb-20">
            <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-8">What is Gestational Diabetes Mellitus?</h2>
            
            <div className="glass-card p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-6 text-gdm-gray"
                >
                  <p>
                    <strong className="text-gdm-dark-charcoal">Gestational Diabetes Mellitus (GDM)</strong> is a type of diabetes that develops during pregnancy in women who didn't have diabetes before becoming pregnant. Like other types of diabetes, gestational diabetes affects how your cells use sugar (glucose).
                  </p>
                  <p>
                    During pregnancy, your body undergoes various hormonal changes. Some of these changes make your body's cells more resistant to insulin, a hormone produced by the pancreas that regulates blood sugar. This insulin resistance is normally countered by increased insulin production, but when the pancreas can't keep up, blood sugar levels rise, resulting in gestational diabetes.
                  </p>
                  <p>
                    GDM typically develops in the second or third trimester and usually disappears after giving birth. However, it can have significant implications for both mother and baby if not properly managed, and it increases the risk of developing type 2 diabetes later in life.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6">
                    <div className="p-5 bg-gdm-light-blue bg-opacity-50 rounded-lg border border-gdm-light-blue">
                      <h3 className="text-lg font-medium text-gdm-dark-charcoal mb-3">Common Symptoms</h3>
                      <p className="text-gdm-gray mb-4">
                        Many women with gestational diabetes don't experience noticeable symptoms. When symptoms do occur, they may include:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                          </div>
                          <span className="text-gdm-gray">Increased thirst</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                          </div>
                          <span className="text-gdm-gray">Frequent urination</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                          </div>
                          <span className="text-gdm-gray">Fatigue</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                          </div>
                          <span className="text-gdm-gray">Nausea</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                          </div>
                          <span className="text-gdm-gray">Blurred vision</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-medium text-gdm-dark-charcoal mb-2">Why Screening Matters</h3>
                          <p className="text-gdm-gray">
                            Because GDM often has no symptoms, routine screening during pregnancy is essential. Most healthcare providers recommend screening between 24 and 28 weeks of pregnancy, or earlier if you have multiple risk factors.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          <section className="mb-20">
            <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-8">Risk Factors & Prevention</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <InfoCard 
                title="Risk Factors" 
                icon={<AlertTriangle className="w-5 h-5" />}
                delay={0.1}
              >
                <p>Several factors can increase your risk of developing gestational diabetes:</p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Age over 25 years</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>BMI of 30 or higher</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Family history of diabetes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Previous gestational diabetes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Previously delivering a baby weighing more than 9 pounds</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Certain ethnicities (Hispanic, Black, Native American, or Asian)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Polycystic ovary syndrome (PCOS)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Prediabetes or impaired glucose tolerance</span>
                  </li>
                </ul>
              </InfoCard>
              
              <InfoCard 
                title="Prevention Strategies" 
                icon={<Activity className="w-5 h-5" />}
                delay={0.2}
              >
                <p>While some risk factors cannot be changed, you can reduce your risk by:</p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Maintaining a healthy weight before pregnancy</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Eating a balanced diet rich in fruits, vegetables, and whole grains</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Limiting refined carbohydrates and added sugars</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Regular physical activity before and during pregnancy</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Early prenatal care and regular check-ups</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-gdm-light-blue bg-opacity-30 rounded-lg">
                  <p className="text-gdm-charcoal">
                    <strong>Remember:</strong> Even with prevention strategies, some women will still develop gestational diabetes due to factors beyond their control. Early detection and management are key.
                  </p>
                </div>
              </InfoCard>
            </div>
          </section>
          
          <section className="mb-20">
            <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-8">Healthy Pregnancy Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <InfoCard 
                title="Nutrition" 
                icon={<Utensils className="w-5 h-5" />}
                delay={0.1}
              >
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Focus on complex carbohydrates with a low glycemic index</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Pair carbohydrates with protein or healthy fats</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Eat smaller, more frequent meals throughout the day</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Stay well-hydrated with water</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Include sources of fiber such as vegetables, fruits, and whole grains</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Limit added sugars and highly processed foods</span>
                  </li>
                </ul>
              </InfoCard>
              
              <InfoCard 
                title="Physical Activity" 
                icon={<Activity className="w-5 h-5" />}
                delay={0.2}
              >
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Aim for 30 minutes of moderate activity on most days</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Choose low-impact exercises like walking, swimming, or prenatal yoga</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Break up exercise into shorter sessions if needed</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Take short walks after meals to help lower blood sugar</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Always consult with your healthcare provider before starting any exercise program</span>
                  </li>
                </ul>
              </InfoCard>
              
              <InfoCard 
                title="Regular Monitoring" 
                icon={<Clock className="w-5 h-5" />}
                delay={0.3}
              >
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Attend all scheduled prenatal appointments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Monitor blood glucose levels as recommended by your healthcare provider</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Track your food intake and physical activity</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Keep a record of your blood sugar readings to share with your healthcare team</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gdm-light-blue flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gdm-blue"></div>
                    </div>
                    <span>Report any unusual symptoms promptly</span>
                  </li>
                </ul>
              </InfoCard>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-12">
            <div className="glass-card p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-10">
                  <h2 className="text-2xl font-display font-medium text-gdm-dark-charcoal mb-3">
                    Ready to Check Your GDM Risk?
                  </h2>
                  <p className="text-gdm-gray max-w-xl">
                    Use our prediction tool to assess your risk of Gestational Diabetes Mellitus and receive personalized recommendations.
                  </p>
                </div>
                <Link 
                  to="/prediction" 
                  className="btn-primary flex items-center whitespace-nowrap"
                >
                  <span>Check Your Risk Now</span>
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </PageTransition>
  );
};

const Utensils = ({ className }: { className?: string }) => (
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
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

export default Information;
