import { useState } from 'react';
import SWMSForm from './SWMSForm.jsx';
import SWMSFormStep2 from './SWMSFormStep2.jsx';
import SWMSFormStep3 from './SWMSFormStep3.jsx';
import SWMSFormStep4 from './SWMSFormStep4.jsx';
import { Link } from 'react-router-dom';

const steps = [
  { label: 'SWMS Details', component: SWMSForm },
  { label: 'Task & Hazards', component: SWMSFormStep2 },
  { label: 'Risk Assessment', component: SWMSFormStep3 },
  { label: 'Review & Submit', component: SWMSFormStep4 },
];

export default function SWMSStepper() {
  const [step, setStep] = useState(0);

  // Optionally, you can collect all form data here and pass as props

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  // Render the current step component, injecting navigation props
  const StepComponent = steps[step].component;

  return (
    <div>
      {/* Stepper indicator */}
      <div  >
      <div className="d-flex align-items-center justify-content-end ">
          {" "}
          <button
            className="btn"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
            // onClick={fetchAutofillData}
          >
            autoFill
          </button>
          <Link to="/swms">
          <button
            
            className="btn btn-secondary "
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
          </Link>
        </div>
      <div className="flex items-center justify-center my-6 space-x-4">
        {steps.map((s, idx) => (
          <div key={s.label} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                idx === step
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-500 border-gray-300'
              }`}
            >
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 h-1 bg-gray-300 mx-2 rounded" />
            )}
          </div>
        ))}
      </div>

      </div>
    
      {/* Step content */}
      <div>
        <StepComponent
          onNext={goNext}
          onBack={goBack}
          isFirstStep={step === 0}
          isLastStep={step === steps.length - 1}
        />
      </div>
    </div>
  );
}