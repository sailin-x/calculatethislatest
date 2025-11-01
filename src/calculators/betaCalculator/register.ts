import { calculatorRegistry } from '../../data/calculatorRegistry';
import { betaCalculator } from './betaCalculator';

export function registerbetaCalculator(): void {
  calculatorRegistry.register(new betaCalculator());
}
