import { calculatorRegistry } from '../../data/calculatorRegistry';
import { emergency_fund_calculatorCalculatorCalculator } from './emergency_fund_calculatorCalculatorCalculator';

export function registeremergency_fund_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new emergency_fund_calculatorCalculatorCalculator());
}
