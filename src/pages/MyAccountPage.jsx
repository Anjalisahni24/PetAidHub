import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { User, Shield, Bell, PawPrint, Edit3, Save, LogOut, Trash2, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MyAccountPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({ name: 'John Doe', email: 'john.doe@example.com' });
  const [pets, setPets] = useState([]);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState({ id: null, name: '', species: '', breed: '', birthDate: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    const storedPets = JSON.parse(localStorage.getItem('userPets')) || [];
    setPets(storedPets);

    const authToken = localStorage.getItem('userAuthToken');
    if (!authToken) {
      toast({ variant: "destructive", title: "Not Authenticated", description: "Please sign in to access your account." });
      navigate('/signin');
    }
  }, [navigate, toast]);

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUserSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    toast({ title: 'Profile Updated', description: 'Your profile information has been saved.' });
  };

  const handlePasswordChange = () => {
    toast({ title: 'Feature Info', description: 'Password change functionality is not yet implemented. 🚀' });
  };

  const handleNotificationToggle = (setting) => {
    toast({ title: 'Feature Info', description: `Notification setting for '${setting}' toggle is not yet implemented. 🚀` });
  };

  const handleSignOut = () => {
    localStorage.removeItem('userAuthToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userPets');
    toast({ title: "Signed Out", description: "You have been successfully signed out. 👋" });
    navigate('/');
  };
  
  useEffect(() => {
    localStorage.setItem('userPets', JSON.stringify(pets));
  }, [pets]);

  const handlePetSubmit = () => {
    if (!currentPet.name || !currentPet.species) {
      toast({ variant: "destructive", title: "Error", description: "Pet name and species are required." });
      return;
    }
    let updatedPets;
    if (currentPet.id) {
      updatedPets = pets.map(p => p.id === currentPet.id ? { ...p, ...currentPet } : p);
      toast({ title: "Pet Updated!", description: `${currentPet.name}'s details have been updated.` });
    } else {
      const newPet = { ...currentPet, id: Date.now().toString() };
      updatedPets = [...pets, newPet];
      toast({ title: "Pet Added!", description: `${newPet.name} has been added.` });
    }
    setPets(updatedPets);
    setIsPetModalOpen(false);
    setCurrentPet({ id: null, name: '', species: '', breed: '', birthDate: '' });
  };

  const openPetModal = (pet = null) => {
    setCurrentPet(pet ? { ...pet } : { id: null, name: '', species: '', breed: '', birthDate: '' });
    setIsPetModalOpen(true);
  };

  const deletePet = (petId) => {
    setPets(pets.filter(p => p.id !== petId));
    toast({ title: "Pet Deleted", description: "The pet has been removed." });
  };


  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'pets', label: 'My Pets', icon: PawPrint },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-gray-100 via-slate-100 to-stone-100"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          My Account
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div 
            className="md:w-1/4 bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <nav className="space-y-2">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full justify-start text-md py-3 px-4 ${activeTab === tab.id ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-md py-3 px-4 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </nav>
          </motion.div>

          {/* Content Area */}
          <motion.div 
            className="md:w-3/4 bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input id="name" name="name" type="text" value={userData.name} onChange={handleUserChange} className="py-3" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input id="email" name="email" type="email" value={userData.email} onChange={handleUserChange} className="py-3" />
                  </div>
                  <Button onClick={handleUserSave} className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'pets' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">My Pets</h2>
                    <Button onClick={() => openPetModal()} className="bg-green-500 hover:bg-green-600">
                        <PlusCircle className="w-4 h-4 mr-2" /> Add Pet
                    </Button>
                </div>
                {pets.length === 0 ? (
                    <p className="text-gray-500">You haven't added any pets yet.</p>
                ) : (
                    <div className="space-y-4">
                        {pets.map(pet => (
                            <div key={pet.id} className="p-4 border rounded-lg flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-700">{pet.name}</h3>
                                    <p className="text-sm text-gray-500">{pet.species} - {pet.breed}</p>
                                    {pet.birthDate && <p className="text-xs text-gray-500">Born: {new Date(pet.birthDate).toLocaleDateString()}</p>}
                                </div>
                                <div>
                                    <Button variant="ghost" size="icon" onClick={() => openPetModal(pet)} className="text-blue-600 hover:text-blue-700">
                                        <Edit3 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => deletePet(pet.id)} className="text-red-600 hover:text-red-700">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <Button onClick={handlePasswordChange} variant="outline" className="w-full md:w-auto py-3">Change Password</Button>
                  <p className="text-sm text-gray-600">Two-factor authentication (2FA) is not yet available.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                    <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">Email Notifications</label>
                    <Button size="sm" variant="outline" onClick={() => handleNotificationToggle('Email')}>Toggle</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                    <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-700">SMS Reminders</label>
                    <Button size="sm" variant="outline" onClick={() => handleNotificationToggle('SMS')}>Toggle</Button>
                  </div>
                   <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                    <label htmlFor="newsletter" className="text-sm font-medium text-gray-700">Subscribe to Newsletter</label>
                    <Button size="sm" variant="outline" onClick={() => handleNotificationToggle('Newsletter')}>Toggle</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Dialog open={isPetModalOpen} onOpenChange={setIsPetModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentPet.id ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
              <DialogDescription>
                {currentPet.id ? 'Update your pet\'s details below.' : 'Fill in the details for your new pet.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input placeholder="Pet Name" value={currentPet.name} onChange={(e) => setCurrentPet({...currentPet, name: e.target.value})} />
              <Select onValueChange={(value) => setCurrentPet({...currentPet, species: value})} value={currentPet.species}>
                <SelectTrigger><SelectValue placeholder="Select Species" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Breed (Optional)" value={currentPet.breed} onChange={(e) => setCurrentPet({...currentPet, breed: e.target.value})} />
              <Input type="date" placeholder="Birth Date (Optional)" value={currentPet.birthDate} onChange={(e) => setCurrentPet({...currentPet, birthDate: e.target.value})} />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handlePetSubmit} className="bg-green-500 hover:bg-green-600">{currentPet.id ? 'Save Changes' : 'Add Pet'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </motion.div>
  );
};

export default MyAccountPage;