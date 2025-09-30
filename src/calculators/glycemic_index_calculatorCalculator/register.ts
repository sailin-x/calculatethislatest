import { calculatorRegistry } from '../../data/calculatorRegistry';
import { glycemic_index_calculatorCalculatorCalculator } from './glycemic_index_calculatorCalculatorCalculator';

export function registerglycemic_index_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new glycemic_index_calculatorCalculatorCalculator());
}
