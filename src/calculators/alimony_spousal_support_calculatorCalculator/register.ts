import { calculatorRegistry } from '../../data/calculatorRegistry';
import { alimony_spousal_support_calculatorCalculatorCalculator } from './alimony_spousal_support_calculatorCalculatorCalculator';

export function registeralimony_spousal_support_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new alimony_spousal_support_calculatorCalculatorCalculator());
}
