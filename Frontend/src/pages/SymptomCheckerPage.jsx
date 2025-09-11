import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PawPrint, Search, Sparkles, AlertTriangle, Loader2, Heart } from 'lucide-react';

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

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom: symptoms }), // 🔹 backend expects "symptom"
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      let result = {
        title: "AI Symptom Analysis",
        certainty: "N/A",
        summary: data.summary,
        details: data.results, // 🔹 backend "results"
        disclaimer:
          "This AI Symptom Checker provides preliminary insights and is not a substitute for professional veterinary advice. Always consult a qualified veterinarian for an accurate diagnosis and treatment plan.",
      };

      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "AI symptom analysis has finished. Please review the results.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while analyzing symptoms.",
      });
    }

    setIsLoading(false);
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
        {/* Header */}
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
            Describe your pet's symptoms, and our AI will provide a preliminary analysis and potential next steps.
          </motion.p>
        </div>

        {/* Input Form */}
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

        {/* Results */}
        {analysisResult && (
          <motion.div 
            className="mt-12 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-7 h-7 mr-3 text-pink-500" /> AI Analysis Results
            </h2>

            {/* Summary from backend */}
            {analysisResult.summary && (
              <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-md">
                <p className="text-gray-800 whitespace-pre-line">{analysisResult.summary}</p>
              </div>
            )}

            {/* Each symptom card */}
            <div className="grid gap-6 sm:grid-cols-2">
              {analysisResult.details.map((item, index) => (
                <div 
                  key={index} 
                  className="p-5 rounded-xl shadow-md border bg-gradient-to-br from-pink-50 to-red-50"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <PawPrint className="w-5 h-5 mr-2 text-pink-600" /> 
                    {item.normalized_symptom}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Risk Level: 
                    <span className={
                      item.risk === "emergency" ? "text-red-600 font-bold ml-1" :
                      item.risk === "high" ? "text-orange-600 font-bold ml-1" :
                      item.risk === "medium" ? "text-yellow-600 font-bold ml-1" :
                      "text-green-600 font-bold ml-1"
                    }>
                      {item.risk.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-gray-700">{item.advice}</p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
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
