import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_optimization_calculatorCalculatorCalculator } from './financial_optimization_calculatorCalculatorCalculator';

export function registerfinancial_optimization_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_optimization_calculatorCalculatorCalculator());
}
