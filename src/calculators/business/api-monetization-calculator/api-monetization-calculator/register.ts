import { calculatorRegistry } from '../../data/calculatorRegistry';
import { api-monetization-calculatorCalculator } from './api-monetization-calculatorCalculator';

export function registerapi-monetization-calculatorCalculator(): void {
  calculatorRegistry.register(new api-monetization-calculatorCalculator());
}
