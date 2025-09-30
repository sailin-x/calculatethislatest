import { calculatorRegistry } from '../../data/calculatorRegistry';
import { income_based_repayment_calculatorCalculatorCalculator } from './income_based_repayment_calculatorCalculatorCalculator';

export function registerincome_based_repayment_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new income_based_repayment_calculatorCalculatorCalculator());
}
