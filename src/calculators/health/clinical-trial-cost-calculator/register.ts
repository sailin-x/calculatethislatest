import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ClinicalTrialCostCalculator } from './ClinicalTrialCostCalculator';

export function registerClinicalTrialCostCalculator(): void {
  calculatorRegistry.register(ClinicalTrialCostCalculator);
}

export { ClinicalTrialCostCalculator };
