import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_performance_calculatorCalculatorCalculator } from './financial_performance_calculatorCalculatorCalculator';

export function registerfinancial_performance_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_performance_calculatorCalculatorCalculator());
}
