import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_growth_calculatorCalculatorCalculator } from './financial_growth_calculatorCalculatorCalculator';

export function registerfinancial_growth_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_growth_calculatorCalculatorCalculator());
}
