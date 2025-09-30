import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NetMarginCalculator } from './NetMarginCalculator';

export function registerNetMarginCalculator(): void {
  calculatorRegistry.register(NetMarginCalculator);
}

export { NetMarginCalculator };
