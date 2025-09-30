import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_education_calculatorCalculatorCalculator } from './financial_education_calculatorCalculatorCalculator';

export function registerfinancial_education_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_education_calculatorCalculatorCalculator());
}
