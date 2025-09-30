import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mental_health_treatment_cost_calculatorCalculatorCalculator } from './mental_health_treatment_cost_calculatorCalculatorCalculator';

export function registermental_health_treatment_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new mental_health_treatment_cost_calculatorCalculatorCalculator());
}
