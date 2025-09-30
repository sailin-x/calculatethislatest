import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ApiMonetizationCalculator } from './ApiMonetizationCalculator';

export function registerApiMonetizationCalculator(): void {
  calculatorRegistry.register(ApiMonetizationCalculator);
}

export { ApiMonetizationCalculator };
