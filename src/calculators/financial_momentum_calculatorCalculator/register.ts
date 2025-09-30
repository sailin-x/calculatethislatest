import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_momentum_calculatorCalculatorCalculator } from './financial_momentum_calculatorCalculatorCalculator';

export function registerfinancial_momentum_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_momentum_calculatorCalculatorCalculator());
}
