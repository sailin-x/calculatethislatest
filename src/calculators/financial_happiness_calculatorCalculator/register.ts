import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_happiness_calculatorCalculatorCalculator } from './financial_happiness_calculatorCalculatorCalculator';

export function registerfinancial_happiness_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_happiness_calculatorCalculatorCalculator());
}
