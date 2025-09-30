import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debt_to_income_calculatorCalculatorCalculator } from './debt_to_income_calculatorCalculatorCalculator';

export function registerdebt_to_income_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new debt_to_income_calculatorCalculatorCalculator());
}
