
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { 
  Video, 
  Pill, 
  FileText, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const services = [
    {
      icon: Video,
      title: "Virtual Vet Consultations",
      description: "Connect with certified veterinarians through high-quality video calls",
      price: "$29",
      period: "per consultation",
      features: [
        "15-30 minute consultation",
        "Certified veterinarians",
        "Prescription services",
        "Follow-up support"
      ],
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "AI Health Assistant",
      description: "24/7 AI-powered health monitoring and instant symptom analysis",
      price: "$19",
      period: "per month",
      features: [
        "24/7 AI health monitoring",
        "Instant symptom analysis",
        "Health trend tracking",
        "Emergency alerts"
      ],
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Complete Health Records",
      description: "Digital health records management with cloud synchronization",
      price: "$9",
      period: "per month",
      features: [
        "Digital health records",
        "Vaccination tracking",
        "Medical history",
        "Cloud synchronization"
      ],
      popular: false,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="gradient-text bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Care Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing options designed to fit every pet owner's needs and budget. Start with our free tier or upgrade for premium features.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border-2 ${
                service.popular ? 'border-purple-200' : 'border-gray-100'
              }`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {service.price}
                    </span>
                    <span className="text-gray-500">
                      {service.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleFeatureClick(service.title)}
                  className={`w-full ${
                    service.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  } text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105`}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            We offer tailored healthcare plans for shelters, veterinary clinics, and large pet communities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => handleFeatureClick('Contact Sales')}
              className="bg-white text-blue-600 hover:bg-gray-100 border-white px-8 py-3 font-semibold rounded-xl"
            >
              Contact Sales
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleFeatureClick('Schedule Demo')}
              className="text-white hover:bg-white/20 px-8 py-3 font-semibold rounded-xl"
            >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
