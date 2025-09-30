import { calculatorRegistry } from '../../data/calculatorRegistry';
import { museum_admission_cost_calculatorCalculatorCalculator } from './museum_admission_cost_calculatorCalculatorCalculator';

export function registermuseum_admission_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new museum_admission_cost_calculatorCalculatorCalculator());
}
