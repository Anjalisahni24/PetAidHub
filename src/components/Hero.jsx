
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img  
          alt="Close-up of a furry animal, likely a dog or cat, with warm brown fur"
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1691437955378-839cb065f7ce" />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full glass-effect"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-blue-500/20 rounded-full glass-effect"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-purple-500/20 rounded-full glass-effect"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-white/20 glass-effect rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium italic">
              From Stray to Safe—Together, We Paw-sitively Care!
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
        >
          Empowering Animal
          <br />
          <span className="gradient-text bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Healthcare for
          </span>
          <br />
          Everyone
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Affordable, accessible, and community-driven solutions for your
          <br />
          pet's health and animal well-being.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
        >
          <Button
            size="lg"
            onClick={() => handleFeatureClick('Get Started Today', '/care-tools')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleFeatureClick('Learn More', '/about-us')}
            className="glass-effect text-white border-white/30 hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-full"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="glass-effect rounded-2xl p-6 text-center">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-white/80">Animals Helped</div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 text-center">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Verified Vets</div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">25,000+</div>
            <div className="text-white/80">Community Members</div>
          </div>
        </motion.div>
      </div>

      {/* AI Assistant Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed bottom-8 right-8 z-30"
      >
        <Button
          onClick={() => handleFeatureClick('AI Assistant (Kodee)', '/care-tools/symptom-checker')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse-slow"
        >
          <Sparkles className="w-6 h-6 mr-2" />
          Ask Kodee
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;