import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Activity, BarChart, PlusCircle, Trash2, Edit3, Dog, Cat, Bird } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HealthTrackerPage = () => {
  const { toast } = useToast();
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState({ id: null, name: '', species: '', breed: '', birthDate: '' });
  const [currentEntry, setCurrentEntry] = useState({ date: '', weight: '', activityLevel: '', notes: '' });

  useEffect(() => {
    const storedPets = JSON.parse(localStorage.getItem('petsHealthTracker')) || [];
    setPets(storedPets);
    if (storedPets.length > 0) {
      setSelectedPetId(storedPets[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('petsHealthTracker', JSON.stringify(pets));
  }, [pets]);

  const handlePetSubmit = () => {
    if (!currentPet.name || !currentPet.species) {
      toast({ variant: "destructive", title: "Error", description: "Pet name and species are required." });
      return;
    }
    if (currentPet.id) {
      setPets(pets.map(p => p.id === currentPet.id ? { ...p, ...currentPet } : p));
      toast({ title: "Pet Updated!", description: `${currentPet.name}'s details have been updated.` });
    } else {
      const newPet = { ...currentPet, id: Date.now().toString(), healthEntries: [] };
      setPets([...pets, newPet]);
      setSelectedPetId(newPet.id);
      toast({ title: "Pet Added!", description: `${newPet.name} has been added to your tracker.` });
    }
    setIsPetModalOpen(false);
    setCurrentPet({ id: null, name: '', species: '', breed: '', birthDate: '' });
  };

  const handleEntrySubmit = () => {
    if (!currentEntry.date || !currentEntry.weight) {
      toast({ variant: "destructive", title: "Error", description: "Date and weight are required for health entry." });
      return;
    }
    const updatedPets = pets.map(pet => {
      if (pet.id === selectedPetId) {
        const newEntries = [...(pet.healthEntries || [])];
        if (currentEntry.id) { // Editing existing entry
          const entryIndex = newEntries.findIndex(e => e.id === currentEntry.id);
          if (entryIndex > -1) newEntries[entryIndex] = currentEntry;
        } else { // Adding new entry
          newEntries.push({ ...currentEntry, id: Date.now().toString() });
        }
        return { ...pet, healthEntries: newEntries.sort((a, b) => new Date(b.date) - new Date(a.date)) };
      }
      return pet;
    });
    setPets(updatedPets);
    toast({ title: "Health Entry Saved!", description: `Entry for ${currentEntry.date} saved successfully.` });
    setIsEntryModalOpen(false);
    setCurrentEntry({ date: '', weight: '', activityLevel: '', notes: '' });
  };
  
  const openPetModal = (pet = null) => {
    setCurrentPet(pet ? { ...pet } : { id: null, name: '', species: '', breed: '', birthDate: '' });
    setIsPetModalOpen(true);
  };

  const openEntryModal = (entry = null, petId) => {
    setSelectedPetId(petId);
    setCurrentEntry(entry ? { ...entry } : {id: null, date: new Date().toISOString().split('T')[0], weight: '', activityLevel: '', notes: '' });
    setIsEntryModalOpen(true);
  };

  const deletePet = (petId) => {
    setPets(pets.filter(p => p.id !== petId));
    if (selectedPetId === petId) {
      setSelectedPetId(pets.length > 1 ? pets.find(p => p.id !== petId).id : null);
    }
    toast({ title: "Pet Deleted", description: "The pet has been removed from your tracker." });
  };

  const deleteEntry = (petId, entryId) => {
    setPets(pets.map(pet => {
      if (pet.id === petId) {
        return { ...pet, healthEntries: pet.healthEntries.filter(e => e.id !== entryId) };
      }
      return pet;
    }));
    toast({ title: "Entry Deleted", description: "The health entry has been removed." });
  };

  const selectedPetData = pets.find(p => p.id === selectedPetId);

  const petSpeciesIcons = {
    dog: <Dog className="w-5 h-5 inline mr-2" />,
    cat: <Cat className="w-5 h-5 inline mr-2" />,
    bird: <Bird className="w-5 h-5 inline mr-2" />,
    default: <Activity className="w-5 h-5 inline mr-2" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div 
            className="inline-block p-4 bg-gradient-to-r from-blue-500 to-sky-600 rounded-full mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          >
            <Activity className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Pet Health Tracker
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Monitor your pet's health vitals, track progress, and keep important notes all in one place.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pet List & Management */}
          <motion.div 
            className="md:col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Pets</h2>
              <Button onClick={() => openPetModal()} size="sm" className="bg-blue-500 hover:bg-blue-600">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Pet
              </Button>
            </div>
            {pets.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pets added yet. Click "Add Pet" to start!</p>
            ) : (
              <ul className="space-y-3">
                {pets.map(pet => (
                  <li key={pet.id} 
                      className={`p-3 rounded-lg cursor-pointer transition-all ${selectedPetId === pet.id ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`}
                      onClick={() => setSelectedPetId(pet.id)}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 flex items-center">
                        {petSpeciesIcons[pet.species] || petSpeciesIcons.default}
                        {pet.name}
                      </span>
                      <div>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600" onClick={(e) => { e.stopPropagation(); openPetModal(pet); }}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600" onClick={(e) => { e.stopPropagation(); deletePet(pet.id); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Health Entries for Selected Pet */}
          <motion.div 
            className="md:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          >
            {selectedPetData ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Health Log for <span className="text-blue-600">{selectedPetData.name}</span>
                  </h2>
                  <Button onClick={() => openEntryModal(null, selectedPetData.id)} className="bg-green-500 hover:bg-green-600">
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Entry
                  </Button>
                </div>
                {selectedPetData.healthEntries && selectedPetData.healthEntries.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {selectedPetData.healthEntries.map(entry => (
                      <div key={entry.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-700">Date: {new Date(entry.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">Weight: {entry.weight} kg</p>
                            {entry.activityLevel && <p className="text-sm text-gray-600">Activity: {entry.activityLevel}</p>}
                          </div>
                           <div>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600" onClick={() => openEntryModal(entry, selectedPetData.id)}>
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600" onClick={() => deleteEntry(selectedPetData.id, entry.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {entry.notes && <p className="text-sm text-gray-500 mt-2 pt-2 border-t border-gray-200">Notes: {entry.notes}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No health entries for {selectedPetData.name} yet. Click "Add Entry".</p>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <BarChart className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Select a pet to view health logs</p>
                <p className="text-gray-500">Or add a new pet to start tracking.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Pet Modal */}
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
              <Button onClick={handlePetSubmit}>{currentPet.id ? 'Save Changes' : 'Add Pet'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Entry Modal */}
        <Dialog open={isEntryModalOpen} onOpenChange={setIsEntryModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentEntry.id ? 'Edit Health Entry' : 'Add Health Entry'}</DialogTitle>
              <DialogDescription>
                Log a new health record for {pets.find(p=>p.id === selectedPetId)?.name || 'your pet'}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input type="date" placeholder="Date" value={currentEntry.date} onChange={(e) => setCurrentEntry({...currentEntry, date: e.target.value})} />
              <Input type="number" placeholder="Weight (kg)" value={currentEntry.weight} onChange={(e) => setCurrentEntry({...currentEntry, weight: e.target.value})} />
              <Select onValueChange={(value) => setCurrentEntry({...currentEntry, activityLevel: value})} value={currentEntry.activityLevel}>
                <SelectTrigger><SelectValue placeholder="Activity Level (Optional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Notes (Optional)" value={currentEntry.notes} onChange={(e) => setCurrentEntry({...currentEntry, notes: e.target.value})} />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleEntrySubmit}>{currentEntry.id ? 'Save Changes' : 'Add Entry'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default HealthTrackerPage;