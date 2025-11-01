import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAPTValueCalculator } from './registerAPTValueCalculator';

export function registerregisterAPTValueCalculator(): void {
  calculatorRegistry.register(new registerAPTValueCalculator());
}
