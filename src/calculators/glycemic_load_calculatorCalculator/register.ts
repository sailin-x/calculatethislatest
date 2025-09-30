import { calculatorRegistry } from '../../data/calculatorRegistry';
import { glycemic_load_calculatorCalculatorCalculator } from './glycemic_load_calculatorCalculatorCalculator';

export function registerglycemic_load_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new glycemic_load_calculatorCalculatorCalculator());
}
