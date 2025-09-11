
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Pill, CalendarCheck, Stethoscope } from 'lucide-react';

const CareToolsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleToolNavigation = (path, toolName) => {
    if (path) {
      navigate(path);
    } else {
      toast({
        title: "🚧 Feature Coming Soon!",
        description: `The '${toolName}' tool isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      });
    }
  };

  const tools = [
    { 
      id: "symptom-checker",
      icon: Heart, 
      title: "AI Symptom Checker", 
      description: "Get instant insights into your pet's symptoms with our advanced AI. Understand potential issues and next steps.",
      path: "/care-tools/symptom-checker",
      color: "from-red-500 to-pink-500"
    },
    { 
      id: "health-tracker",
      icon: Activity, 
      title: "Pet Health Tracker", 
      description: "Monitor your pet's weight, activity levels, vaccinations, and medical history all in one place.",
      path: "/care-tools/health-tracker", 
      color: "from-blue-500 to-sky-500"
    },
    { 
      id: "medication-reminder",
      icon: Pill, 
      title: "Medication Reminder", 
      description: "Never miss a dose. Set up reminders for medications, flea treatments, and other important pet care tasks.",
      path: "/care-tools/medication-reminder", 
      color: "from-green-500 to-emerald-500"
    },
    { 
      id: "vaccination-scheduler",
      icon: CalendarCheck, 
      title: "Vaccination Scheduler", 
      description: "Keep track of your pet's vaccination schedule and receive timely reminders for upcoming shots.",
      path: "/care-tools/vaccination-scheduler", 
      color: "from-yellow-500 to-amber-500"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Pet <span className="gradient-text bg-gradient-to-r from-green-600 to-teal-600">Care Tools</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering you with smart tools to manage your pet's health and well-being effectively. From AI-powered diagnostics to handy reminders, we've got you covered.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              id={tool.id} // Ensure ID matches for header navigation
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 card-hover border border-gray-100 flex flex-col h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{tool.description}</p>
                <Button
                  onClick={() => handleToolNavigation(tool.path, tool.title)}
                  className={`w-full mt-auto bg-gradient-to-r ${tool.color} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105`}
                >
                  Use Tool
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CareToolsPage;