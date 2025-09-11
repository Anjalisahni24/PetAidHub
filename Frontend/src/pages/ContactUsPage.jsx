
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Send, MessageSquare, HelpCircle, Users } from 'lucide-react';

const ContactUsPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.inquiryType) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly. 🚀",
    });
    setFormData({ name: '', email: '', subject: '', message: '', inquiryType: '' });
  };

  const contactMethods = [
    { icon: Mail, title: "Email Us", content: "hello@petaidhub.com", link: "mailto:hello@petaidhub.com" },
    { icon: Phone, title: "Call Us", content: "+1 (555) 123-4567", link: "tel:+15551234567" },
    { icon: MapPin, title: "Visit Us", content: "123 Pet Street, Animal City, CA 90210", link: "#" },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: HelpCircle },
    { value: "support", label: "Technical Support", icon: MessageSquare },
    { value: "partnership", label: "Partnership", icon: Users },
    { value: "feedback", label: "Feedback/Suggestion", icon: Mail },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
           <motion.div 
            className="inline-block p-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          >
            <Phone className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Get In <span className="gradient-text bg-gradient-to-r from-yellow-600 to-orange-600">Touch</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're here to help! Whether you have a question about our services, need support, or just want to say hi, feel free to reach out.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div 
            className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-200"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
              </div>
               <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">Reason for Contact</label>
                <Select onValueChange={handleSelectChange} value={formData.inquiryType}>
                  <SelectTrigger id="inquiryType" className="w-full">
                    <SelectValue placeholder="Select a reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="w-4 h-4 mr-2 text-gray-500" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} placeholder="Regarding..." required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <Textarea name="message" id="message" value={formData.message} onChange={handleChange} placeholder="Tell us more..." rows={5} required />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:opacity-90 text-white font-semibold py-3 text-lg rounded-xl"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Other Ways to Reach Us</h2>
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg flex items-start space-x-6 card-hover">
                <div className={`w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <method.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <a 
                    href={method.link === "#" ? undefined : method.link} 
                    onClick={method.link === "#" ? () => toast({ title: "Visit Us", description: "Our office address is: 123 Pet Street, Animal City, CA 90210. We recommend calling ahead!"}) : undefined}
                    className="text-orange-600 hover:text-orange-700 transition-colors break-all"
                  >
                    {method.content}
                  </a>
                </div>
              </div>
            ))}
             <div className="bg-white p-6 rounded-2xl shadow-lg card-hover">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 3:00 PM (PST)</p>
                <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUsPage;
