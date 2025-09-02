import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CalendarCheck, PlusCircle, Trash2, Edit3, ShieldCheck, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const VaccinationSchedulerPage = () => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({ 
    id: null, 
    petName: '', 
    vaccineName: '', 
    vaccinationDate: '', 
    nextDueDate: '', 
    isDone: false,
    notes: '' 
  });
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const storedSchedules = JSON.parse(localStorage.getItem('vaccinationSchedules')) || [];
    setSchedules(storedSchedules.sort((a,b) => new Date(a.vaccinationDate) - new Date(b.vaccinationDate)));
    
    const storedPets = JSON.parse(localStorage.getItem('petsHealthTracker')) || [];
    setPets(storedPets);
  }, []);

  useEffect(() => {
    localStorage.setItem('vaccinationSchedules', JSON.stringify(schedules));
  }, [schedules]);

  const handleSubmit = () => {
    if (!currentSchedule.petName || !currentSchedule.vaccineName || !currentSchedule.vaccinationDate) {
      toast({ variant: "destructive", title: "Error", description: "Pet name, vaccine name, and vaccination date are required." });
      return;
    }
    if (currentSchedule.id) {
      setSchedules(schedules.map(s => s.id === currentSchedule.id ? currentSchedule : s).sort((a,b) => new Date(a.vaccinationDate) - new Date(b.vaccinationDate)));
      toast({ title: "Schedule Updated!", description: `Vaccination schedule for ${currentSchedule.vaccineName} updated.` });
    } else {
      setSchedules([...schedules, { ...currentSchedule, id: Date.now().toString() }].sort((a,b) => new Date(a.vaccinationDate) - new Date(b.vaccinationDate)));
      toast({ title: "Schedule Added!", description: `New vaccination schedule for ${currentSchedule.vaccineName} set.` });
    }
    setIsModalOpen(false);
    setCurrentSchedule({ id: null, petName: '', vaccineName: '', vaccinationDate: '', nextDueDate: '', isDone: false, notes: '' });
  };

  const openModal = (schedule = null) => {
    setCurrentSchedule(schedule ? { ...schedule } : { 
      id: null, 
      petName: pets.length > 0 ? pets[0].name : '', 
      vaccineName: '', 
      vaccinationDate: new Date().toISOString().split('T')[0], 
      nextDueDate: '', 
      isDone: false,
      notes: '' 
    });
    setIsModalOpen(true);
  };

  const deleteSchedule = (scheduleId) => {
    setSchedules(schedules.filter(s => s.id !== scheduleId));
    toast({ title: "Schedule Deleted", description: "The vaccination schedule has been removed." });
  };

  const toggleDone = (scheduleId) => {
    setSchedules(schedules.map(s => s.id === scheduleId ? { ...s, isDone: !s.isDone } : s));
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0,0,0,0); 
    due.setHours(0,0,0,0); 
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div 
            className="inline-block p-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          >
            <CalendarCheck className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Vaccination Scheduler
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Keep your pet's vaccinations up-to-date. Track schedules and receive reminders for upcoming shots.
          </motion.p>
        </div>

        <div className="text-right mb-8">
          <Button onClick={() => openModal()} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <PlusCircle className="w-5 h-5 mr-2" /> Add Vaccination
          </Button>
        </div>

        {schedules.length === 0 ? (
          <motion.p 
            className="text-gray-500 text-center py-12 text-xl bg-white p-8 rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          >
            <ShieldCheck className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            No vaccination schedules yet. Add one to protect your pet!
          </motion.p>
        ) : (
          <div className="space-y-6">
            {schedules.map(schedule => {
              const daysUntil = schedule.nextDueDate ? getDaysUntilDue(schedule.nextDueDate) : null;
              let dueDateStatusColor = 'text-gray-600'; 
              if (daysUntil !== null) {
                if (daysUntil < 0) dueDateStatusColor = 'text-red-600 font-semibold'; 
                else if (daysUntil <= 7) dueDateStatusColor = 'text-orange-600 font-semibold'; 
                else dueDateStatusColor = 'text-green-600'; 
              }

              return (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white p-6 rounded-xl shadow-lg border ${schedule.isDone ? 'border-green-300 opacity-70' : 'border-amber-200'} hover:shadow-xl transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3">
                  <div className="mb-3 sm:mb-0">
                    <h3 className={`text-xl font-semibold ${schedule.isDone ? 'text-gray-500 line-through' : 'text-amber-700'}`}>{schedule.vaccineName}</h3>
                    <p className="text-sm text-gray-600">For: <span className="font-medium">{schedule.petName}</span></p>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Label htmlFor={`done-${schedule.id}`} className="flex items-center text-sm text-gray-600 cursor-pointer">
                        <Checkbox id={`done-${schedule.id}`} checked={schedule.isDone} onCheckedChange={() => toggleDone(schedule.id)} className="mr-2" />
                        Administered
                    </Label>
                    <ShieldCheck className={`w-6 h-6 ${schedule.isDone ? 'text-green-500' : 'text-amber-500'}`} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
                  <p><CalendarCheck className="inline w-4 h-4 mr-1 text-amber-600" /> <span className="font-medium">Vaccination Date:</span> {new Date(schedule.vaccinationDate).toLocaleDateString()}</p>
                  {schedule.nextDueDate ? (
                    <p className={dueDateStatusColor}>
                      <AlertCircle className="inline w-4 h-4 mr-1" /> 
                      <span className="font-medium">Next Due:</span> {new Date(schedule.nextDueDate).toLocaleDateString()}
                      {daysUntil !== null && (
                        <span className="ml-1 text-xs">
                          ({daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : daysUntil === 0 ? 'Due today' : `${daysUntil} days`})
                        </span>
                      )}
                    </p>
                  ): <p className="text-gray-500">No next due date set.</p>}
                </div>
                {schedule.notes && <p className="text-sm text-gray-600 pt-2 mt-2 border-t border-gray-200"><span className="font-medium">Notes:</span> {schedule.notes}</p>}

                <div className="flex justify-end items-center mt-4 space-x-2">
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600" onClick={() => openModal(schedule)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600" onClick={() => deleteSchedule(schedule.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
            })}
          </div>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{currentSchedule.id ? 'Edit Vaccination' : 'Add Vaccination'}</DialogTitle>
              <DialogDescription>
                {currentSchedule.id ? 'Update the details for this vaccination.' : 'Schedule a new vaccination for your pet.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Select onValueChange={(value) => setCurrentSchedule({...currentSchedule, petName: value})} value={currentSchedule.petName}>
                <SelectTrigger><SelectValue placeholder="Select Pet" /></SelectTrigger>
                <SelectContent>
                   {pets.length > 0 ? pets.map(pet => (
                    <SelectItem key={pet.id} value={pet.name}>{pet.name}</SelectItem>
                  )) : <SelectItem value="no-pets-placeholder" disabled>No pets found. Add pets in Health Tracker.</SelectItem>}
                </SelectContent>
              </Select>
              <Input placeholder="Vaccine Name (e.g., Rabies, DHPP)" value={currentSchedule.vaccineName} onChange={(e) => setCurrentSchedule({...currentSchedule, vaccineName: e.target.value})} />
              <div>
                <Label htmlFor="vaccinationDate" className="text-sm font-medium text-gray-700">Vaccination Date</Label>
                <Input type="date" id="vaccinationDate" value={currentSchedule.vaccinationDate} onChange={(e) => setCurrentSchedule({...currentSchedule, vaccinationDate: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="nextDueDate" className="text-sm font-medium text-gray-700">Next Due Date (Optional)</Label>
                <Input type="date" id="nextDueDate" value={currentSchedule.nextDueDate} onChange={(e) => setCurrentSchedule({...currentSchedule, nextDueDate: e.target.value})} />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isDone" checked={currentSchedule.isDone} onCheckedChange={(checked) => setCurrentSchedule({...currentSchedule, isDone: checked})} />
                <Label htmlFor="isDone" className="text-sm font-medium text-gray-700">Mark as administered</Label>
              </div>
              <Textarea placeholder="Notes (e.g., vet clinic, batch number)" value={currentSchedule.notes} onChange={(e) => setCurrentSchedule({...currentSchedule, notes: e.target.value})} />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleSubmit} className="bg-yellow-500 hover:bg-yellow-600 text-white">{currentSchedule.id ? 'Save Changes' : 'Add Schedule'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default VaccinationSchedulerPage;