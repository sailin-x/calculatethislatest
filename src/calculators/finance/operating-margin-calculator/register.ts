import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { OperatingMarginCalculator } from './OperatingMarginCalculator';

export function registerOperatingMarginCalculator(): void {
  calculatorRegistry.register(OperatingMarginCalculator);
}

export { OperatingMarginCalculator };
