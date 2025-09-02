import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Menu, X, ChevronDown, Shield, Users, Stethoscope, FolderHeart as HomeIcon, Info, MessageCircle, Wrench as Tool, FileText, Phone, Activity, Pill, CalendarCheck, LogOut, UserCircle, Heart as LogoHeartIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/1120793d-33c1-4b9c-837e-9eb52e74a3d9/f9b6bed5ad1904f467443873a62ce44d.png";


  useEffect(() => {
    const token = localStorage.getItem('userAuthToken');
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem('userAuthToken');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNavigation = (path, featureName) => {
    setActiveDropdown(null); 
    setIsMenuOpen(false);
    if (path) {
      navigate(path);
    } else {
      toast({
        title: "🚧 Feature Coming Soon!",
        description: `${featureName} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('userAuthToken');
    setIsLoggedIn(false);
    toast({ title: "Signed Out", description: "You have been successfully signed out. 👋" });
    navigate('/');
    setIsMenuOpen(false);
  };
  
  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { 
      name: 'About Us', 
      path: '/about-us',
      icon: Info,
      dropdown: [
        { name: 'Our Mission', path: '/about-us#mission', icon: LogoHeartIcon },
        { name: 'Team', path: '/about-us#team', icon: Users },
        { name: 'Careers', path: '/about-us#careers', icon: Shield }
      ]
    },
    { 
      name: 'Community', 
      path: '/community',
      icon: Users,
      dropdown: [
        { name: 'Pet Stories', path: '/community#stories', icon: LogoHeartIcon },
        { name: 'Forums', path: '/community#forums', icon: Users },
        { name: 'Events', path: '/community#events', icon: Shield }
      ]
    },
    { 
      name: 'Care Tools', 
      path: '/care-tools',
      icon: Tool,
      dropdown: [
        { name: 'AI Symptom Checker', path: '/care-tools/symptom-checker', icon: LogoHeartIcon },
        { name: 'Pet Health Tracker', path: '/care-tools/health-tracker', icon: Activity },
        { name: 'Medication Reminder', path: '/care-tools/medication-reminder', icon: Pill },
        { name: 'Vaccination Scheduler', path: '/care-tools/vaccination-scheduler', icon: CalendarCheck },
      ]
    },
    { name: 'Consult a vet', path: '/consult-a-vet', icon: MessageCircle },
    { name: 'Pet Insurance', path: '/pet-insurance', icon: FileText },
    { name: 'Contact Us', path: '/contact-us', icon: Phone }
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img src={logoUrl} alt="Pet Aid Hub Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-gray-800">PET AID HUB</span>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Button 
                        variant="ghost"
                        onClick={() => item.path && navigate(item.path)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          (location.pathname.startsWith(item.path) && item.path !== '/') || (location.pathname === '/' && item.path === '/')
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-1" />
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20"
                          >
                            {item.dropdown.map((dropItem) => (
                              <Button
                                variant="ghost"
                                key={dropItem.name}
                                onClick={() => handleNavigation(dropItem.path, dropItem.name)}
                                className="flex items-center space-x-3 w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <dropItem.icon className="w-4 h-4" />
                                <span>{dropItem.name}</span>
                              </Button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation(item.path, item.name)}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-1" />
                      <span>{item.name}</span>
                    </Button>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleNavigation('/my-account', 'My Account')}
                    className="hover:bg-blue-50 text-gray-700 hover:text-blue-600"
                  >
                    <UserCircle className="w-5 h-5 mr-1" /> My Account
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="hover:bg-red-50 hover:text-red-600 border-red-200 text-red-600"
                  >
                     <LogOut className="w-5 h-5 mr-1" /> Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => handleNavigation('/signin', 'Sign In')}
                  className="hover:bg-blue-50 hover:text-blue-600 border-blue-200"
                >
                  Sign in/up
                </Button>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div key={item.name}>
                        <Button
                          variant="ghost"
                          onClick={() => handleNavigation(item.path, item.name)}
                          className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <item.icon className="w-4 h-4 mr-2 inline-block" />
                          {item.name}
                        </Button>
                        <div className="pl-8 space-y-1 mt-1">
                        {item.dropdown.map(dropItem => (
                           <Button
                           variant="ghost"
                           key={dropItem.name}
                           onClick={() => handleNavigation(dropItem.path, dropItem.name)}
                           className="block w-full text-left px-3 py-2 rounded-md text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                         >
                           <dropItem.icon className="w-3 h-3 mr-2 inline-block" />
                           {dropItem.name}
                         </Button>
                        ))}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Button
                      variant="ghost"
                      key={item.name}
                      onClick={() => handleNavigation(item.path, item.name)}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <item.icon className="w-4 h-4 mr-2 inline-block" />
                      {item.name}
                    </Button>
                  )
                })}
                {isLoggedIn ? (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleNavigation('/my-account', 'My Account')}
                      className="w-full text-left mt-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                       <UserCircle className="w-4 h-4 mr-2 inline-block" /> My Account
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                      className="w-full mt-2 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
                    >
                       <LogOut className="w-4 h-4 mr-2 inline-block" /> Sign Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => handleNavigation('/signin', 'Sign In')}
                    className="w-full mt-4"
                  >
                    Sign in/up
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;