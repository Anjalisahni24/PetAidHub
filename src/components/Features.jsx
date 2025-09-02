import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Heart, 
  Shield, 
  Users, 
  Calendar, 
  MessageCircle,
  Smartphone,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFeatureClick = (feature, path) => {
    if (path) {
      navigate(path);
    } else {
      toast({
        title: "🚧 Feature Coming Soon!",
        description: `The '${feature}' feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      });
    }
  };

  const features = [
    {
      icon: Stethoscope,
      title: "AI Health Diagnosis",
      description: "Advanced AI-powered symptom analysis and health recommendations for your pets",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
      path: "/care-tools/symptom-checker"
    },
    {
      icon: MessageCircle,
      title: "24/7 Vet Consultations",
      description: "Connect with certified veterinarians anytime, anywhere through video calls",
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
      path: "/consult-a-vet"
    },
    {
      icon: Shield,
      title: "Pet Insurance Hub",
      description: "Compare and choose the best insurance plans tailored for your pet's needs",
      color: "from-purple-500 to-violet-500",
      delay: 0.3,
      path: "/pet-insurance"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated appointment booking and medication reminders with AI optimization",
      color: "from-orange-500 to-red-500",
      delay: 0.4,
      path: "/care-tools/vaccination-scheduler" // Or medication reminder
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join thousands of pet owners sharing experiences and getting support",
      color: "from-pink-500 to-rose-500",
      delay: 0.5,
      path: "/community"
    },
    {
      icon: Smartphone,
      title: "Mobile Health Tracker",
      description: "Track your pet's health metrics, vaccinations, and medical history on-the-go",
      color: "from-indigo-500 to-blue-500",
      delay: 0.6,
      path: "/care-tools/health-tracker"
    }
  ];

  const stats = [
    { icon: Award, number: "98%", label: "Success Rate", color: "text-yellow-500" },
    { icon: Clock, number: "24/7", label: "Availability", color: "text-green-500" },
    { icon: MapPin, number: "50+", label: "Cities Covered", color: "text-blue-500" },
    { icon: Heart, number: "100K+", label: "Happy Pets", color: "text-red-500" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
            Revolutionary Pet Care
            <span className="gradient-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of animal healthcare with our AI-powered platform designed to make pet care accessible, affordable, and effective for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-gray-100 flex flex-col h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {feature.description}
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => handleFeatureClick(feature.title, feature.path)}
                  className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors mt-auto"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Pet Owners Worldwide
            </h3>
            <p className="text-gray-600 text-lg">
              Our platform has helped thousands of pets live healthier, happier lives
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 ${stat.color} bg-opacity-10 rounded-2xl flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;