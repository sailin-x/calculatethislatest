import { calculatorRegistry } from '../../data/calculatorRegistry';
import { investment_calculatorCalculatorCalculator } from './investment_calculatorCalculatorCalculator';

export function registerinvestment_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new investment_calculatorCalculatorCalculator());
}
