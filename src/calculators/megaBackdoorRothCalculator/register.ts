import { calculatorRegistry } from '../../data/calculatorRegistry';
import { megaBackdoorRothCalculator } from './megaBackdoorRothCalculator';

export function registermegaBackdoorRothCalculator(): void {
  calculatorRegistry.register(new megaBackdoorRothCalculator());
}
