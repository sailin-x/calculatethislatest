import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerMegaBackdoorRothCalculator } from './registerMegaBackdoorRothCalculator';

export function registerregisterMegaBackdoorRothCalculator(): void {
  calculatorRegistry.register(new registerMegaBackdoorRothCalculator());
}
