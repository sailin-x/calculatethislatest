import { calculatorRegistry } from '../../data/calculatorRegistry';
import { churn_rate_calculatorCalculatorCalculator } from './churn_rate_calculatorCalculatorCalculator';

export function registerchurn_rate_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new churn_rate_calculatorCalculatorCalculator());
}
