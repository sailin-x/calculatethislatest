import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_efficiency_calculatorCalculatorCalculator } from './financial_efficiency_calculatorCalculatorCalculator';

export function registerfinancial_efficiency_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_efficiency_calculatorCalculatorCalculator());
}
