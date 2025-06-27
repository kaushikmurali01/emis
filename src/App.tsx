import React, { useState } from 'react';
import { Building2, FileText, BarChart3, CheckCircle } from 'lucide-react';
import FacilityForm from './components/FacilityForm';
import ScoringSection from './components/ScoringSection';
import ResultsDisplay from './components/ResultsDisplay';
import { FacilityData, ScoringResults } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [facilityData, setFacilityData] = useState<FacilityData | null>(null);
  const [scoringResults, setScoringResults] = useState<ScoringResults | null>(null);

  const steps = [
    { id: 1, title: 'Facility Information', icon: Building2 },
    { id: 2, title: 'EMIS Scoring', icon: FileText },
    { id: 3, title: 'Results & Recommendations', icon: BarChart3 }
  ];

  const handleFacilitySubmit = (data: FacilityData) => {
    setFacilityData(data);
    setCurrentStep(2);
  };

  const handleScoringComplete = (results: ScoringResults) => {
    setScoringResults(results);
    setCurrentStep(3);
  };

  const resetTool = () => {
    setCurrentStep(1);
    setFacilityData(null);
    setScoringResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/Enerva-logo.png" alt="Enerva" className="h-8 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-secondary-900">EMIS Scoring Tool</h1>
                <p className="text-sm text-secondary-600">NRCan Guidelines Assessment</p>
              </div>
            </div>
            {currentStep > 1 && (
              <button
                onClick={resetTool}
                className="btn-secondary"
              >
                Start New Assessment
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200
                    ${isActive ? 'bg-primary-600 border-primary-600 text-white' : 
                      isCompleted ? 'bg-green-600 border-green-600 text-white' : 
                      'bg-white border-secondary-300 text-secondary-400'}
                  `}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-secondary-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-secondary-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {currentStep === 1 && (
          <FacilityForm onSubmit={handleFacilitySubmit} />
        )}
        
        {currentStep === 2 && facilityData && (
          <ScoringSection 
            facilityData={facilityData}
            onComplete={handleScoringComplete}
          />
        )}
        
        {currentStep === 3 && facilityData && scoringResults && (
          <ResultsDisplay 
            facilityData={facilityData}
            results={scoringResults}
          />
        )}
      </main>
    </div>
  );
}

export default App;