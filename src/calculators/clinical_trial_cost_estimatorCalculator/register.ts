import { calculatorRegistry } from '../../data/calculatorRegistry';
import { clinical_trial_cost_estimatorCalculator } from './clinical_trial_cost_estimatorCalculator';

export function registerclinical_trial_cost_estimatorCalculator(): void {
  calculatorRegistry.register(new clinical_trial_cost_estimatorCalculator());
}
