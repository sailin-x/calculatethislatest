import { calculatorRegistry } from '../../data/calculatorRegistry';
import { college_financial_aidCalculatorCalculator } from './college_financial_aidCalculatorCalculator';

export function registercollege_financial_aidCalculatorCalculator(): void {
  calculatorRegistry.register(new college_financial_aidCalculatorCalculator());
}
