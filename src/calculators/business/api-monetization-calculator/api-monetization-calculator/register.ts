import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ApiMonetizationCalculator } from './ApiMonetizationCalculator';

export function RegisterapiMonetizationCalculator(): void {
  calculatorRegistry.register(new ApiMonetizationCalculator());
}
