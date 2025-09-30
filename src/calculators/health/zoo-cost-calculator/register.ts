import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ZooCostCalculator } from './ZooCostCalculator';

export function registerZooCostCalculator(): void {
  calculatorRegistry.register(ZooCostCalculator);
}

export { ZooCostCalculator };
