import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PawPrint, Search, Sparkles, AlertTriangle, CheckCircle, Loader2, Heart } from 'lucide-react';

const SymptomCheckerPage = () => {
  const { toast } = useToast();
  const [petType, setPetType] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleCheckSymptoms = async () => {
    if (!petType || !symptoms.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a pet type and describe the symptoms.",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    await new Promise(resolve => setTimeout(resolve, 2500));

    let result = {
      title: "Preliminary Analysis",
      certainty: "Moderate",
      possibleConditions: [],
      recommendations: [],
      disclaimer: "This AI Symptom Checker provides preliminary insights and is not a substitute for professional veterinary advice. Always consult a qualified veterinarian for an accurate diagnosis and treatment plan.",
    };

    const lowerSymptoms = symptoms.toLowerCase();

    if (petType === "dog") {
      if (lowerSymptoms.includes("vomiting") && lowerSymptoms.includes("diarrhea")) {
        result.possibleConditions.push("Gastroenteritis");
        result.recommendations.push("Keep your dog hydrated. Offer bland food like boiled chicken and rice.");
        result.recommendations.push("Monitor for dehydration (tacky gums, lethargy).");
      }
      if (lowerSymptoms.includes("coughing") && lowerSymptoms.includes("sneezing")) {
        result.possibleConditions.push("Kennel Cough or Respiratory Infection");
        result.recommendations.push("Isolate from other dogs if possible.");
        result.recommendations.push("Ensure good ventilation.");
      }
      if (lowerSymptoms.includes("itching") && lowerSymptoms.includes("scratching")) {
        result.possibleConditions.push("Allergies or Skin Infection");
        result.recommendations.push("Check for fleas or ticks.");
        result.recommendations.push("Avoid known allergens if any.");
      }
    } else if (petType === "cat") {
      if (lowerSymptoms.includes("lethargy") && lowerSymptoms.includes("not eating")) {
        result.possibleConditions.push("Various potential issues (e.g., infection, pain)");
        result.recommendations.push("Loss of appetite in cats can be serious. Monitor closely.");
        result.recommendations.push("Try offering highly palatable food.");
      }
      if (lowerSymptoms.includes("urinating frequently") || lowerSymptoms.includes("straining to urinate")) {
        result.possibleConditions.push("Feline Lower Urinary Tract Disease (FLUTD)");
        result.recommendations.push("Ensure access to fresh water.");
        result.recommendations.push("This can be an emergency, especially in male cats. Seek vet advice promptly if straining is observed.");
      }
    }

    if (result.possibleConditions.length === 0) {
      result.possibleConditions.push("General Malaise or Undetermined Symptoms");
      result.recommendations.push("Monitor your pet closely for any changes.");
      result.recommendations.push("If symptoms persist or worsen, consult a veterinarian.");
    }
    
    result.recommendations.push("Seek veterinary attention if symptoms are severe, persist for more than 24-48 hours, or if your pet's condition worsens.");


    setAnalysisResult(result);
    setIsLoading(false);
    toast({
      title: "Analysis Complete",
      description: "AI symptom analysis has finished. Please review the results.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 bg-gradient-to-br from-red-50 via-pink-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div 
            className="inline-block p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          >
            <Heart className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            AI Symptom Checker
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Describe your pet's symptoms, and our AI "Kodee" will provide a preliminary analysis and potential next steps.
          </motion.p>
        </div>

        <motion.div 
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="space-y-6 mb-8">
            <div>
              <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-1">
                Select Pet Type <PawPrint className="inline w-4 h-4 ml-1 text-pink-500" />
              </label>
              <Select onValueChange={setPetType} value={petType}>
                <SelectTrigger id="petType" className="w-full">
                  <SelectValue placeholder="Choose your pet..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="other-disabled" disabled>Other (Coming Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                Describe Symptoms <Sparkles className="inline w-4 h-4 ml-1 text-yellow-500" />
              </label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., My dog has been vomiting and seems very tired. He started coughing yesterday..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-gray-500 mt-1">Be as detailed as possible for a better analysis.</p>
            </div>
          </div>

          <Button 
            onClick={handleCheckSymptoms} 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 text-white font-semibold py-3 text-lg rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Check Symptoms with AI
              </>
            )}
          </Button>
        </motion.div>

        {analysisResult && (
          <motion.div 
            className="mt-12 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-7 h-7 mr-3 text-pink-500" /> AI Analysis Results
            </h2>
            
            <div className="mb-6 p-4 bg-pink-50 border-l-4 border-pink-500 rounded-md">
              <p className="font-semibold text-pink-700">Title: {analysisResult.title}</p>
              <p className="text-sm text-pink-600">AI Confidence: {analysisResult.certainty}</p>
            </div>

            {analysisResult.possibleConditions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Possible Conditions:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {analysisResult.possibleConditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysisResult.recommendations.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Recommendations & Next Steps:</h3>
                <ul className="space-y-2">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Important Disclaimer</h4>
                  <p className="text-sm text-yellow-700">{analysisResult.disclaimer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SymptomCheckerPage;