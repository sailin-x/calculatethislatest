import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { QuickRatioCalculator } from './QuickRatioCalculator';

export function registerQuickRatioCalculator(): void {
  calculatorRegistry.register(QuickRatioCalculator);
}

export { QuickRatioCalculator };
