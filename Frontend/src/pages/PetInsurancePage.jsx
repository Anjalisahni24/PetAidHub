
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Shield, FileText, Activity, DollarSign, CheckCircle, BarChart3 } from 'lucide-react';

const PetInsurancePage = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `The '${feature}' feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  const benefits = [
    { icon: Activity, title: "Accident & Illness Coverage", description: "Comprehensive protection for unexpected vet bills due to accidents or illnesses." },
    { icon: DollarSign, title: "Financial Peace of Mind", description: "Reduce the stress of costly treatments and focus on your pet's recovery." },
    { icon: FileText, title: "Customizable Plans", description: "Choose coverage levels, deductibles, and reimbursement options that fit your budget." },
    { icon: Shield, title: "Wellness Add-ons", description: "Optional coverage for routine care like vaccinations, dental cleanings, and check-ups." },
  ];

  const comparisonPoints = [
    "Coverage for hereditary conditions",
    "Emergency care and hospitalization",
    "Prescription medications",
    "Behavioral therapies",
    "Alternative treatments (e.g., acupuncture)",
    "Annual limits and lifetime maximums"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div 
            className="inline-block p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          >
            <Shield className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Protect Your Pet with <span className="gradient-text bg-gradient-to-r from-indigo-600 to-purple-600">Insurance</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find the best pet insurance plan to safeguard your furry friend's health and your finances. Compare top providers and get a personalized quote today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button 
              size="lg" 
              onClick={() => handleFeatureClick('Get a Quote')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg"
            >
              Get a Free Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleFeatureClick('Compare Plans')}
              className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg rounded-full shadow-lg"
            >
              Compare Plans
            </Button>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">Benefits of Pet Insurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100 flex items-start space-x-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mb-16 sm:mb-20 bg-white p-8 sm:p-12 rounded-3xl shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">Easily Compare Top Providers</h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our platform helps you compare key features from leading pet insurance companies to find the perfect fit. Look for coverage on:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {comparisonPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => handleFeatureClick('Start Comparing')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white font-semibold px-8 py-3 text-lg rounded-xl"
            >
              <BarChart3 className="mr-2 w-5 h-5" />
              Start Comparing Now
            </Button>
          </div>
        </div>
        
        {/* How to Choose CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-12 text-center text-white">
          <FileText className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our comprehensive guide can help you understand the ins and outs of pet insurance and choose the best plan for your pet's unique needs.
          </p>
          <Button
            onClick={() => handleFeatureClick('Read Insurance Guide')}
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-xl text-lg"
          >
            Read Our Pet Insurance Guide
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PetInsurancePage;
