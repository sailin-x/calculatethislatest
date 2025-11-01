import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerBetaCalculator } from './registerBetaCalculator';

export function registerregisterBetaCalculator(): void {
  calculatorRegistry.register(new registerBetaCalculator());
}
