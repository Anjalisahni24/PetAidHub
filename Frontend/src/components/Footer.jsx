import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/1120793d-33c1-4b9c-837e-9eb52e74a3d9/f9b6bed5ad1904f467443873a62ce44d.png";


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

  const footerLinks = {
    services: [
      { name: 'Vet Consultations', path: '/consult-a-vet' },
      { name: 'AI Health Assistant', path: '/care-tools/symptom-checker' },
      { name: 'Pet Insurance', path: '/pet-insurance' },
      { name: 'Health Records', path: '/care-tools/health-tracker' },
      { name: 'Emergency Care', path: '/consult-a-vet' }, // Or a dedicated emergency page
      { name: 'Vaccination Tracking', path: '/care-tools/vaccination-scheduler' }
    ],
    community: [
      { name: 'Pet Forums', path: '/community#forums' },
      { name: 'Success Stories', path: '/community#stories' },
      { name: 'Local Events', path: '/community#events' },
      { name: 'Volunteer Program', path: '/community' }, // General community page
      { name: 'Adoption Center', path: '/community' }, // General community page
      { name: 'Educational Resources', path: '/community' } // General community page
    ],
    company: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Our Mission', path: '/about-us#mission' },
      { name: 'Careers', path: '/about-us#careers' },
      { name: 'Press Kit', path: null }, // No specific page yet
      { name: 'Partner Program', path: null }, // No specific page yet
      { name: 'Contact Us', path: '/contact-us' }
    ],
    support: [
      { name: 'Help Center', path: '/contact-us' }, // Contact Us can serve as help center for now
      { name: 'Privacy Policy', path: null }, // No specific page yet
      { name: 'Terms of Service', path: null }, // No specific page yet
      { name: 'Cookie Policy', path: null }, // No specific page yet
      { name: 'Security', path: null }, // No specific page yet
      { name: 'Accessibility', path: null } // No specific page yet
    ]
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', href: '#' },
    { icon: Twitter, name: 'Twitter', href: '#' },
    { icon: Instagram, name: 'Instagram', href: '#' },
    { icon: Linkedin, name: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Pet Care Tips
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Get weekly newsletters with expert advice, health tips, and community stories
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                onClick={() => handleFeatureClick('Newsletter Signup', null)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                   <img src={logoUrl} alt="Pet Aid Hub Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold">PET AID HUB</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering animal healthcare for everyone through innovative technology, 
                community support, and accessible veterinary care.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>hello@petaidhub.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleFeatureClick(link.name, link.path)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Community</h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleFeatureClick(link.name, link.path)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleFeatureClick(link.name, link.path)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleFeatureClick(link.name, link.path)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Pet Aid Hub. All rights reserved. Made with ❤️ for animals everywhere.
            </div>
            
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(social.name, social.href === '#' ? null : social.href)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;