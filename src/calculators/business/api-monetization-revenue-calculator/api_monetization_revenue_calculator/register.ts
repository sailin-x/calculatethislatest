import { calculatorRegistry } from '../../data/calculatorRegistry';
import { api_monetization_revenue_calculatorCalculator } from './api_monetization_revenue_calculatorCalculator';

export function registerapi_monetization_revenue_calculatorCalculator(): void {
  calculatorRegistry.register(new api_monetization_revenue_calculatorCalculator());
}
