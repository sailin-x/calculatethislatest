import { calculatorRegistry } from '../../data/calculatorRegistry';
import { api_monetization_calculatorCalculator } from './api_monetization_calculatorCalculator';

export function registerapi_monetization_calculatorCalculator(): void {
  calculatorRegistry.register(new api_monetization_calculatorCalculator());
}
