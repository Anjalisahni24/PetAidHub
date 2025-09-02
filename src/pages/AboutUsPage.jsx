
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Heart, Users, Shield, Award, Target, Eye } from 'lucide-react';

const AboutUsPage = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `The '${feature}' feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  const teamMembers = [
    { name: "Dr. Pawla Smith", role: "Chief Veterinary Officer", image: "Portrait of Dr. Pawla Smith, a veterinarian", expertise: "Small Animal Surgery" },
    { name: "Kodee the AI", role: "Lead AI Health Advisor", image: "Friendly AI robot mascot", expertise: "Symptom Analysis & Data Science" },
    { name: "Mark Ruffalo", role: "Community Manager", image: "Portrait of Mark Ruffalo, community manager", expertise: "Online Engagement" },
    { name: "Jane Doe", role: "Lead Software Engineer", image: "Portrait of Jane Doe, software engineer", expertise: "Full-Stack Development" },
  ];

  const values = [
    { icon: Heart, title: "Compassion", description: "Every animal deserves kindness and care. We approach our work with empathy and understanding." },
    { icon: Award, title: "Excellence", description: "We strive for the highest standards in veterinary care, technology, and community support." },
    { icon: Users, title: "Collaboration", description: "Together with pet owners, vets, and communities, we create a stronger network of care." },
    { icon: Target, title: "Innovation", description: "We leverage cutting-edge AI and technology to make pet healthcare accessible and effective." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="gradient-text">Pet Aid Hub</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We are dedicated to revolutionizing animal healthcare through technology, community, and compassion. Our mission is to make quality pet care accessible and affordable for everyone, everywhere.
          </motion.p>
        </div>

        {/* Our Mission & Vision */}
        <div id="mission" className="grid md:grid-cols-2 gap-12 mb-16 sm:mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img-replace alt="Diverse group of animals (dog, cat, bird, rabbit) looking healthy and happy" className="rounded-2xl shadow-xl w-full h-auto object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-8 h-8 mr-3 text-blue-600" /> Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To empower pet owners and animal welfare organizations with innovative tools and resources, fostering a global community dedicated to the health and happiness of animals. We aim to bridge the gap in pet healthcare accessibility through AI-driven solutions and collaborative efforts.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-8 h-8 mr-3 text-purple-600" /> Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                A world where every animal has access to quality healthcare, and every pet owner feels supported and informed. We envision Pet Aid Hub as the leading global platform for comprehensive animal well-being.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our Values */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Meet The Team */}
        <div id="team" className="mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center card-hover"
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-200">
                  <img-replace alt={member.image} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-1">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Careers Section */}
        <div id="careers" className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white">
          <Shield className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Pack!</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Passionate about animals and technology? We're always looking for talented individuals to join our mission. Explore exciting career opportunities at Pet Aid Hub.
          </p>
          <Button
            onClick={() => handleFeatureClick('View Careers')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-xl text-lg"
          >
            View Open Positions
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUsPage;
