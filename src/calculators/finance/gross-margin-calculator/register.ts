import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GrossMarginCalculator } from './GrossMarginCalculator';

export function registerGrossMarginCalculator(): void {
  calculatorRegistry.register(GrossMarginCalculator);
}

export { GrossMarginCalculator };
