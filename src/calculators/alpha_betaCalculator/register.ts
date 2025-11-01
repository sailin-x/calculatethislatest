import { calculatorRegistry } from '../../data/calculatorRegistry';
import { alpha_betaCalculator } from './alpha_betaCalculator';

export function registeralpha_betaCalculator(): void {
  calculatorRegistry.register(new alpha_betaCalculator());
}
