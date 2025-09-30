import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_compliance_calculatorCalculatorCalculator } from './financial_compliance_calculatorCalculatorCalculator';

export function registerfinancial_compliance_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_compliance_calculatorCalculatorCalculator());
}
