import { calculatorRegistry } from '../../data/calculatorRegistry';
import { lapse_rate_sensitivity_analysisCalculator } from './lapse_rate_sensitivity_analysisCalculator';

export function registerlapse_rate_sensitivity_analysisCalculator(): void {
  calculatorRegistry.register(new lapse_rate_sensitivity_analysisCalculator());
}
