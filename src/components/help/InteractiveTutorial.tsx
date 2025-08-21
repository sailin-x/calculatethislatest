import React, { useState, useEffect, useRef } from 'react';
import { HelpSystemService, Tutorial, TutorialStep } from '../../services/HelpSystemService';

interface InteractiveTutorialProps {
  calculatorId: string;
  onComplete?: () => void;
  onClose?: () => void;
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  calculatorId,
  onComplete,
  onClose
}) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stepValidation, setStepValidation] = useState<Record<string, boolean>>({});
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tutorials = HelpSystemService.getTutorials(calculatorId);
    if (tutorials.length > 0) {
      setTutorial(tutorials[0]);
    }
  }, [calculatorId]);

  useEffect(() => {
    if (isActive && tutorial) {
      const currentStep = tutorial.steps[currentStepIndex];
      if (currentStep?.action?.target) {
        highlightElement(currentStep.action.target);
      }
    }

    return () => {
      removeHighlight();
    };
  }, [isActive, currentStepIndex, tutorial]);

  const startTutorial = () => {
    setIsActive(true);
    setCurrentStepIndex(0);
    setStepValidation({});
  };

  const nextStep = () => {
    if (!tutorial) return;

    const currentStep = tutorial.steps[currentStepIndex];
    
    // Validate current step if needed
    if (currentStep.validation && !validateStep(currentStep)) {
      return;
    }

    if (currentStepIndex < tutorial.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      completeTutorial();
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const completeTutorial = () => {
    setIsActive(false);
    removeHighlight();
    onComplete?.();
  };

  const closeTutorial = () => {
    setIsActive(false);
    removeHighlight();
    onClose?.();
  };

  const validateStep = (step: TutorialStep): boolean => {
    if (!step.validation) return true;

    const targetElement = document.getElementById(step.action?.target || '');
    if (!targetElement) return false;

    switch (step.validation.type) {
      case 'presence':
        const value = (targetElement as HTMLInputElement).value;
        return value && value.trim().length > 0;
      
      case 'value':
        const currentValue = (targetElement as HTMLInputElement).value;
        return currentValue === step.validation.expected;
      
      case 'custom':
        if (step.validation.validator) {
          const elementValue = (targetElement as HTMLInputElement).value;
          return step.validation.validator(elementValue, {});
        }
        return false;
      
      default:
        return true;
    }
  };

  const highlightElement = (elementId: string) => {
    removeHighlight();
    
    const element = document.getElementById(elementId);
    if (!element) return;

    // Add highlight class
    element.classList.add('tutorial-highlight');
    setHighlightedElement(element);

    // Scroll element into view
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Add CSS for highlighting if not already present
    if (!document.getElementById('tutorial-styles')) {
      const style = document.createElement('style');
      style.id = 'tutorial-styles';
      style.textContent = `
        .tutorial-highlight {
          position: relative;
          z-index: 1001;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2) !important;
          border-radius: 4px;
        }
        .tutorial-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }
  };

  const removeHighlight = () => {
    if (highlightedElement) {
      highlightedElement.classList.remove('tutorial-highlight');
      setHighlightedElement(null);
    }
  };

  const executeStepAction = () => {
    if (!tutorial) return;

    const currentStep = tutorial.steps[currentStepIndex];
    if (!currentStep.action) return;

    const targetElement = document.getElementById(currentStep.action.target);
    if (!targetElement) return;

    switch (currentStep.action.type) {
      case 'input':
        if (currentStep.action.value) {
          (targetElement as HTMLInputElement).value = currentStep.action.value;
          targetElement.dispatchEvent(new Event('input', { bubbles: true }));
          targetElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
        (targetElement as HTMLInputElement).focus();
        break;
      
      case 'click':
        targetElement.click();
        break;
      
      case 'navigate':
        // Handle navigation if needed
        break;
    }
  };

  if (!tutorial) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">No tutorial available for this calculator.</p>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-2xl">🎓</div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">
              {tutorial.title}
            </h3>
            <p className="text-blue-700 text-sm mb-3">
              {tutorial.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-blue-600 mb-3">
              <span>⏱️ {tutorial.duration} minutes</span>
              <span>📊 {tutorial.difficulty}</span>
              <span>📝 {tutorial.steps.length} steps</span>
            </div>
            <button
              onClick={startTutorial}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Tutorial
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStep = tutorial.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / tutorial.steps.length) * 100;

  return (
    <>
      {/* Overlay */}
      <div ref={overlayRef} className="tutorial-overlay" />
      
      {/* Tutorial Panel */}
      <div className="fixed bottom-4 right-4 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-[1002]">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">
              {tutorial.title}
            </h3>
            <button
              onClick={closeTutorial}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-sm text-gray-600">
            Step {currentStepIndex + 1} of {tutorial.steps.length}
          </div>
        </div>

        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            {currentStep.title}
          </h4>
          
          <p className="text-gray-600 text-sm mb-4">
            {currentStep.content}
          </p>

          {currentStep.action && (
            <div className="mb-4">
              <button
                onClick={executeStepAction}
                className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
              >
                {currentStep.action.type === 'input' && '✏️ Fill Example'}
                {currentStep.action.type === 'click' && '👆 Click Here'}
                {currentStep.action.type === 'navigate' && '🧭 Navigate'}
              </button>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={previousStep}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {currentStepIndex === tutorial.steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractiveTutorial;