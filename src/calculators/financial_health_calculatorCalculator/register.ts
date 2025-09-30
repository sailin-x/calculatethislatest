import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_health_calculatorCalculatorCalculator } from './financial_health_calculatorCalculatorCalculator';

export function registerfinancial_health_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_health_calculatorCalculatorCalculator());
}
