import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MegaBackdoorRothCalculator } from './MegaBackdoorRothCalculator';

export function registerMegaBackdoorRothCalculator(): void {
  calculatorRegistry.register(MegaBackdoorRothCalculator);
}

export { MegaBackdoorRothCalculator };
