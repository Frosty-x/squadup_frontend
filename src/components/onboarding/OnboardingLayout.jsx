import { Routes, Route, useLocation } from 'react-router-dom';
import Step1ProfileBasics from './Step1ProfileBasics';
import Step2Location from './Step2Location';
import Step3Sports from './Step3Sports';

export default function OnboardingLayout() {
  const location = useLocation();
  
  // Determine current step based on route
  const getCurrentStep = () => {
    if (location.pathname.includes('step3')) return 3;
    if (location.pathname.includes('step2')) return 2;
    return 1;
  };

  const currentStep = getCurrentStep();
  const stepLabels = ['Profile', 'Location', 'Sports'];

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Header with Logo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-red-700 rotate-45"></div>
            <span className="text-2xl badscript tracking-wider text-white">
              SquadUp
            </span>
          </div>
          <div className="text-sm text-gray-400 badscript">
            Step {currentStep} of 3
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 py-4">
          
          {/* Progress Indicators */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1">
                <div className={`h-2 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-red-600' : 'bg-neutral-800'
                }`}>
                  {step === currentStep && (
                    <div className="h-full bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mt-3 text-xs font-semibold">
            {stepLabels.map((label, index) => (
              <span 
                key={label}
                className={currentStep >= index + 1 ? 'text-red-600' : 'text-gray-500'}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-40 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Routes>
            <Route path="step1" element={<Step1ProfileBasics />} />
            <Route path="step2" element={<Step2Location />} />
            <Route path="step3" element={<Step3Sports />} />
            <Route path="*" element={<Step1ProfileBasics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}