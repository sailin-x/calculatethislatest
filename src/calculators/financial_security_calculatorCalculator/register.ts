import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_security_calculatorCalculatorCalculator } from './financial_security_calculatorCalculatorCalculator';

export function registerfinancial_security_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_security_calculatorCalculatorCalculator());
}
