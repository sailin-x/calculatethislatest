import { calculatorRegistry } from '../../data/calculatorRegistry';
import { clinical_trial_cost_estimatorCalculatorCalculator } from './clinical_trial_cost_estimatorCalculatorCalculator';

export function registerclinical_trial_cost_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new clinical_trial_cost_estimatorCalculatorCalculator());
}
