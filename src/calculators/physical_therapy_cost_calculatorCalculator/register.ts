import { calculatorRegistry } from '../../data/calculatorRegistry';
import { physical_therapy_cost_calculatorCalculatorCalculator } from './physical_therapy_cost_calculatorCalculatorCalculator';

export function registerphysical_therapy_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new physical_therapy_cost_calculatorCalculatorCalculator());
}
