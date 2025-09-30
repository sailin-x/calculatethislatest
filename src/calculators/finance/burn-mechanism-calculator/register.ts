import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BurnMechanismCalculator } from './BurnMechanismCalculator';

export function registerBurnMechanismCalculator(): void {
  calculatorRegistry.register(BurnMechanismCalculator);
}

export { BurnMechanismCalculator };
