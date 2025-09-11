
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Video, Calendar, MessageSquare, Users, ShieldCheck, Clock } from 'lucide-react';

const ConsultVetPage = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `The '${feature}' feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  const features = [
    { icon: Video, title: "Video Consultations", description: "High-quality video calls with certified vets from the comfort of your home." },
    { icon: MessageSquare, title: "Chat Support", description: "Quick questions? Get text-based advice from veterinary professionals." },
    { icon: Calendar, title: "Easy Scheduling", description: "Book appointments at your convenience with our simple online calendar." },
    { icon: Users, title: "Expert Veterinarians", description: "Access a network of experienced and compassionate veterinary doctors." },
    { icon: ShieldCheck, title: "Secure & Private", description: "Your consultations and pet's data are kept confidential and secure." },
    { icon: Clock, title: "Flexible Hours", description: "Connect with vets during evenings and weekends to fit your busy schedule." },
  ];

  const steps = [
    { number: 1, title: "Choose a Vet", description: "Browse profiles and select a vet that meets your needs." },
    { number: 2, title: "Book Appointment", description: "Pick a date and time that works for you." },
    { number: 3, title: "Consult Online", description: "Connect via video call for your consultation." },
    { number: 4, title: "Get Advice & Plan", description: "Receive diagnosis, treatment plan, and prescriptions if needed." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div 
            className="inline-block p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          >
            <Video className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Consult a <span className="gradient-text bg-gradient-to-r from-sky-600 to-blue-600">Veterinarian Online</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get professional veterinary advice anytime, anywhere. Connect with experienced vets for video consultations, chat support, and personalized care for your pet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              onClick={() => handleFeatureClick('Book Consultation')}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg"
            >
              Book a Consultation Now
            </Button>
          </motion.div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">Why Choose Online Vet Consultations?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA for finding a vet */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-6 text-sky-200" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Find the Right Vet?</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Browse our network of qualified veterinarians and find the perfect match for your pet's needs.
          </p>
          <Button
            onClick={() => handleFeatureClick('Find a Vet')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-xl text-lg"
          >
            Find a Vet
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConsultVetPage;
