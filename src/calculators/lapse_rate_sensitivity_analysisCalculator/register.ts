import { calculatorRegistry } from '../../data/calculatorRegistry';
import { lapse_rate_sensitivity_analysisCalculatorCalculator } from './lapse_rate_sensitivity_analysisCalculatorCalculator';

export function registerlapse_rate_sensitivity_analysisCalculatorCalculator(): void {
  calculatorRegistry.register(new lapse_rate_sensitivity_analysisCalculatorCalculator());
}
