import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Pill, PlusCircle, Trash2, Edit3, Bell, CalendarDays, CheckCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MedicationReminderPage = () => {
  const { toast } = useToast();
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReminder, setCurrentReminder] = useState({ 
    id: null, 
    petName: '', 
    medicationName: '', 
    dosage: '', 
    frequency: '', 
    time: '', 
    startDate: '',
    notes: '' 
  });
  const [pets, setPets] = useState([]); 

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('medicationReminders')) || [];
    setReminders(storedReminders.sort((a,b) => new Date(a.startDate + ' ' + a.time) - new Date(b.startDate + ' ' + b.time)));
    
    const storedPets = JSON.parse(localStorage.getItem('petsHealthTracker')) || [];
    setPets(storedPets);
  }, []);

  useEffect(() => {
    localStorage.setItem('medicationReminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleSubmit = () => {
    if (!currentReminder.petName || !currentReminder.medicationName || !currentReminder.time || !currentReminder.frequency || !currentReminder.startDate) {
      toast({ variant: "destructive", title: "Error", description: "Pet name, medication, time, frequency and start date are required." });
      return;
    }
    if (currentReminder.id) {
      setReminders(reminders.map(r => r.id === currentReminder.id ? currentReminder : r).sort((a,b) => new Date(a.startDate + ' ' + a.time) - new Date(b.startDate + ' ' + b.time)));
      toast({ title: "Reminder Updated!", description: `Reminder for ${currentReminder.medicationName} updated.` });
    } else {
      setReminders([...reminders, { ...currentReminder, id: Date.now().toString() }].sort((a,b) => new Date(a.startDate + ' ' + a.time) - new Date(b.startDate + ' ' + b.time)));
      toast({ title: "Reminder Added!", description: `New reminder for ${currentReminder.medicationName} set.` });
    }
    setIsModalOpen(false);
    setCurrentReminder({ id: null, petName: '', medicationName: '', dosage: '', frequency: '', time: '', startDate: '', notes: '' });
  };

  const openModal = (reminder = null) => {
    setCurrentReminder(reminder ? { ...reminder } : { 
      id: null, 
      petName: pets.length > 0 ? pets[0].name : '', 
      medicationName: '', 
      dosage: '', 
      frequency: 'Once a day', 
      time: '08:00', 
      startDate: new Date().toISOString().split('T')[0], 
      notes: '' 
    });
    setIsModalOpen(true);
  };

  const deleteReminder = (reminderId) => {
    setReminders(reminders.filter(r => r.id !== reminderId));
    toast({ title: "Reminder Deleted", description: "The medication reminder has been removed." });
  };

  const markAsDone = (reminderId) => {
    const reminder = reminders.find(r => r.id === reminderId);
    toast({ title: "Action Logged", description: `${reminder.medicationName} for ${reminder.petName} marked (logic to be expanded).` });
  };
  
  const frequencyOptions = ["Once a day", "Twice a day", "Three times a day", "Every X hours", "As needed"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div 
            className="inline-block p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          >
            <Pill className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Medication Reminders
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Never miss a dose! Set up and manage medication schedules for your pets.
          </motion.p>
        </div>

        <div className="text-right mb-8">
          <Button onClick={() => openModal()} className="bg-green-500 hover:bg-green-600">
            <PlusCircle className="w-5 h-5 mr-2" /> Add New Reminder
          </Button>
        </div>

        {reminders.length === 0 ? (
          <motion.p 
            className="text-gray-500 text-center py-12 text-xl bg-white p-8 rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          >
            <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            No medication reminders set up yet. Click "Add New Reminder" to get started!
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reminders.map(reminder => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-emerald-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-700">{reminder.medicationName}</h3>
                    <p className="text-sm text-gray-600">For: <span className="font-medium">{reminder.petName}</span></p>
                  </div>
                  <Pill className="w-6 h-6 text-emerald-500" />
                </div>
                
                <div className="space-y-1 text-sm text-gray-700 mb-4">
                  <p><span className="font-medium">Dosage:</span> {reminder.dosage || 'N/A'}</p>
                  <p><Clock className="inline w-4 h-4 mr-1 text-emerald-600" /> <span className="font-medium">Time:</span> {reminder.time}</p>
                  <p><CalendarDays className="inline w-4 h-4 mr-1 text-emerald-600" /> <span className="font-medium">Frequency:</span> {reminder.frequency}</p>
                   <p><CalendarDays className="inline w-4 h-4 mr-1 text-emerald-600" /> <span className="font-medium">Start Date:</span> {new Date(reminder.startDate).toLocaleDateString()}</p>
                  {reminder.notes && <p className="pt-1 mt-1 border-t border-gray-200"><span className="font-medium">Notes:</span> {reminder.notes}</p>}
                </div>

                <div className="flex justify-between items-center mt-4">
                   <Button variant="ghost" size="sm" onClick={() => markAsDone(reminder.id)} className="text-green-600 hover:bg-green-100">
                    <CheckCircle className="w-4 h-4 mr-1" /> Mark Done (Log)
                  </Button>
                  <div>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600" onClick={() => openModal(reminder)}>
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600" onClick={() => deleteReminder(reminder.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{currentReminder.id ? 'Edit Reminder' : 'Add New Reminder'}</DialogTitle>
              <DialogDescription>
                {currentReminder.id ? 'Update the details for this medication reminder.' : 'Set up a new medication reminder for your pet.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Select onValueChange={(value) => setCurrentReminder({...currentReminder, petName: value})} value={currentReminder.petName} >
                <SelectTrigger><SelectValue placeholder="Select Pet" /></SelectTrigger>
                <SelectContent>
                  {pets.length > 0 ? pets.map(pet => (
                    <SelectItem key={pet.id} value={pet.name}>{pet.name}</SelectItem>
                  )) : <SelectItem value="no-pets-placeholder" disabled>No pets found. Add pets in Health Tracker.</SelectItem>}
                </SelectContent>
              </Select>
              <Input placeholder="Medication Name" value={currentReminder.medicationName} onChange={(e) => setCurrentReminder({...currentReminder, medicationName: e.target.value})} />
              <Input placeholder="Dosage (e.g., 1 tablet, 5ml)" value={currentReminder.dosage} onChange={(e) => setCurrentReminder({...currentReminder, dosage: e.target.value})} />
              <Select onValueChange={(value) => setCurrentReminder({...currentReminder, frequency: value})} value={currentReminder.frequency}>
                <SelectTrigger><SelectValue placeholder="Select Frequency" /></SelectTrigger>
                <SelectContent>
                  {frequencyOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input type="time" placeholder="Time" value={currentReminder.time} onChange={(e) => setCurrentReminder({...currentReminder, time: e.target.value})} />
              <Input type="date" placeholder="Start Date" value={currentReminder.startDate} onChange={(e) => setCurrentReminder({...currentReminder, startDate: e.target.value})} />
              <Textarea placeholder="Notes (e.g., with food)" value={currentReminder.notes} onChange={(e) => setCurrentReminder({...currentReminder, notes: e.target.value})} />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">{currentReminder.id ? 'Save Changes' : 'Add Reminder'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default MedicationReminderPage;