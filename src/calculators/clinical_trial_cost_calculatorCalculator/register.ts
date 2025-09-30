import { calculatorRegistry } from '../../data/calculatorRegistry';
import { clinical_trial_cost_calculatorCalculatorCalculator } from './clinical_trial_cost_calculatorCalculatorCalculator';

export function registerclinical_trial_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new clinical_trial_cost_calculatorCalculatorCalculator());
}
