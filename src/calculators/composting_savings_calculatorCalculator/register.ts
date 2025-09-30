import { calculatorRegistry } from '../../data/calculatorRegistry';
import { composting_savings_calculatorCalculatorCalculator } from './composting_savings_calculatorCalculatorCalculator';

export function registercomposting_savings_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new composting_savings_calculatorCalculatorCalculator());
}
