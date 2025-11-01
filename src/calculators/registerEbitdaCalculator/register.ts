import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEbitdaCalculator } from './registerEbitdaCalculator';

export function registerregisterEbitdaCalculator(): void {
  calculatorRegistry.register(new registerEbitdaCalculator());
}
