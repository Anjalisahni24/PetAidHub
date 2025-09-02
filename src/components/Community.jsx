
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  Heart, 
  Share2,
  Star,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';

const Community = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const communityFeatures = [
    {
      icon: MessageSquare,
      title: "Pet Care Forums",
      description: "Connect with fellow pet owners, share experiences, and get advice from the community",
      members: "15,000+ members",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calendar,
      title: "Local Events",
      description: "Join pet meetups, adoption drives, and educational workshops in your area",
      members: "200+ events monthly",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Read inspiring recovery stories and celebrate pet health victories together",
      members: "5,000+ stories shared",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Dog Owner",
      content: "The AI health assistant helped me catch my dog's illness early. The community support was incredible during the recovery process!",
      rating: 5,
      avatar: "Happy dog owner with golden retriever"
    },
    {
      name: "Mike Chen",
      role: "Cat Rescue Volunteer",
      content: "This platform revolutionized how we manage health records for our rescue cats. The vet consultations are a game-changer!",
      rating: 5,
      avatar: "Volunteer with rescue cats"
    },
    {
      name: "Emily Rodriguez",
      role: "Pet Parent",
      content: "I love the community forums! Getting advice from experienced pet owners has been invaluable for my first-time pet parenting journey.",
      rating: 5,
      avatar: "Young woman with small dog"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
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
            Join Our Caring
            <span className="gradient-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Community
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with thousands of pet lovers, share experiences, and build lasting friendships while ensuring the best care for your furry friends.
          </p>
        </motion.div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="flex items-center space-x-2 text-sm text-blue-600 font-semibold mb-6">
                  <Users className="w-4 h-4" />
                  <span>{feature.members}</span>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handleFeatureClick(feature.title)}
                  className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors"
                >
                  Join Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Community Says
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <img  
                      alt={testimonial.avatar}
                      className="w-12 h-12 rounded-full object-cover"
                     src="https://images.unsplash.com/photo-1649399045831-40bfde3ef21d" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <Heart className="w-16 h-16 mx-auto mb-6 text-pink-200" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Family?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Become part of a community that truly cares about animal welfare. Share your story, learn from others, and make a difference together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => handleFeatureClick('Join Community')}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-xl"
            >
              Join Community
              <Users className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleFeatureClick('Share Story')}
              className="text-white hover:bg-white/20 px-8 py-3 font-semibold rounded-xl"
            >
              Share Your Story
              <Share2 className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
