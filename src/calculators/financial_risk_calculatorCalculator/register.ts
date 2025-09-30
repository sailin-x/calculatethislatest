import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_risk_calculatorCalculatorCalculator } from './financial_risk_calculatorCalculatorCalculator';

export function registerfinancial_risk_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_risk_calculatorCalculatorCalculator());
}
