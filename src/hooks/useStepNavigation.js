import { useState, useEffect, useCallback } from 'react';
import { useUrlState } from './useUrlState';
import { validateStepTransition } from '../utils/stepValidation';

/**
 * Custom hook for managing multi-step navigation with URL state
 * Handles step progression, validation, and URL synchronization
 */
export const useStepNavigation = (stepConfig = {}) => {
  const { 
    steps = ['categories', 'subcategories', 'form', 'confirmation'],
    defaultStep = 'categories',
    requiredFields = {} // { step: [required fields] }
  } = stepConfig;

  const { urlState, updateUrl } = useUrlState();
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const [stepHistory, setStepHistory] = useState([defaultStep]);
  const [isValidating, setIsValidating] = useState(false);

  // Initialize step from URL
  useEffect(() => {
    const urlStep = urlState.step || defaultStep;
    
    console.log('useStepNavigation effect - urlStep:', urlStep, 'currentStep:', currentStep, 'urlState:', urlState);
    
    if (steps.includes(urlStep)) {
      // Validate if user can access this step
      const isValid = validateStepTransition(urlState, urlStep, requiredFields);
      console.log('Step transition validation:', isValid, 'for step:', urlStep);
      
      if (isValid) {
        if (currentStep !== urlStep) {
          console.log('Setting currentStep to:', urlStep);
          setCurrentStep(urlStep);
        }
        if (!stepHistory.includes(urlStep)) {
          setStepHistory(prev => [...prev, urlStep]);
        }
      } else {
        // Redirect to valid step
        const validStep = getValidStep(urlState);
        console.log('Invalid step, redirecting to:', validStep);
        navigateToStep(validStep, { replace: true });
      }
    } else if (urlStep !== currentStep) {
      // Update URL if step is invalid
      console.log('Invalid step, updating URL to default step:', defaultStep);
      updateUrl({ step: defaultStep }, { replace: true });
      setCurrentStep(defaultStep);
    }
  }, [urlState.step, urlState.service, urlState.category, JSON.stringify(urlState.subcategories)]);

  // Get the valid step based on current URL state
  const getValidStep = useCallback((state) => {
    // Check if we have service
    if (!state.service) return 'categories'; // Should redirect to services selection
    
    // Check if we have category for subcategories step
    if (state.service && !state.category) return 'categories';
    
    // Check if we have subcategories for form step
    if (state.service && state.category && !state.subcategories) return 'subcategories';
    
    // Check if we have required form fields for confirmation
    if (state.step === 'confirmation') {
      const formFields = requiredFields.form || ['name', 'email'];
      const hasRequiredFields = formFields.every(field => state[field]);
      if (!hasRequiredFields) return 'form';
    }
    
    return state.step || defaultStep;
  }, [requiredFields, defaultStep]);

  // Navigate to specific step
  const navigateToStep = useCallback((step, options = {}) => {
    const { replace = false, validate = true } = options;
    
    if (!steps.includes(step)) {
      console.warn(`Invalid step: ${step}`);
      return false;
    }

    setIsValidating(true);

    // Validate step transition if required
    if (validate) {
      const isValid = validateStepTransition(urlState, step, requiredFields);
      if (!isValid) {
        const validStep = getValidStep(urlState);
        setCurrentStep(validStep);
        updateUrl({ step: validStep }, { replace: true });
        setIsValidating(false);
        return false;
      }
    }

    setCurrentStep(step);
    updateUrl({ step }, { replace });
    
    // Update step history
    if (!replace) {
      setStepHistory(prev => {
        const newHistory = [...prev];
        if (!newHistory.includes(step)) {
          newHistory.push(step);
        }
        return newHistory;
      });
    }

    setIsValidating(false);
    return true;
  }, [steps, urlState, updateUrl, requiredFields, getValidStep]);

  // Go to next step
  const nextStep = useCallback(() => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepName = steps[currentIndex + 1];
      return navigateToStep(nextStepName);
    }
    return false;
  }, [currentStep, steps, navigateToStep]);

  // Go to previous step
  const previousStep = useCallback(() => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStepName = steps[currentIndex - 1];
      return navigateToStep(prevStepName);
    }
    return false;
  }, [currentStep, steps, navigateToStep]);

  // Go back in history
  const goBack = useCallback(() => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop(); // Remove current step
      const previousStep = newHistory[newHistory.length - 1];
      setStepHistory(newHistory);
      return navigateToStep(previousStep, { replace: true, validate: false });
    }
    return false;
  }, [stepHistory, navigateToStep]);

  // Check if step is accessible
  const isStepAccessible = useCallback((step) => {
    return validateStepTransition(urlState, step, requiredFields);
  }, [urlState, requiredFields]);

  // Get step progress percentage
  const getProgress = useCallback(() => {
    const currentIndex = steps.indexOf(currentStep);
    return Math.round(((currentIndex + 1) / steps.length) * 100);
  }, [currentStep, steps]);

  // Check if current step is first
  const isFirstStep = useCallback(() => {
    return steps.indexOf(currentStep) === 0;
  }, [currentStep, steps]);

  // Check if current step is last
  const isLastStep = useCallback(() => {
    return steps.indexOf(currentStep) === steps.length - 1;
  }, [currentStep, steps]);

  // Get step metadata
  const getStepMeta = useCallback((step) => {
    const stepIndex = steps.indexOf(step);
    return {
      index: stepIndex,
      isFirst: stepIndex === 0,
      isLast: stepIndex === steps.length - 1,
      progress: Math.round(((stepIndex + 1) / steps.length) * 100),
      isAccessible: isStepAccessible(step),
      isCurrent: step === currentStep
    };
  }, [steps, currentStep, isStepAccessible]);

  // Reset step navigation
  const resetSteps = useCallback(() => {
    setCurrentStep(defaultStep);
    setStepHistory([defaultStep]);
    updateUrl({ step: defaultStep }, { replace: true });
  }, [defaultStep, updateUrl]);

  return {
    currentStep,
    stepHistory,
    navigateToStep,
    nextStep,
    previousStep,
    goBack,
    isStepAccessible,
    getProgress,
    isFirstStep,
    isLastStep,
    getStepMeta,
    resetSteps,
    isValidating,
    steps
  };
};

export default useStepNavigation;