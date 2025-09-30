import { calculatorRegistry } from '../../data/calculatorRegistry';
import { api_monetization_revenue_calculatorCalculatorCalculator } from './api_monetization_revenue_calculatorCalculatorCalculator';

export function registerapi_monetization_revenue_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new api_monetization_revenue_calculatorCalculatorCalculator());
}
