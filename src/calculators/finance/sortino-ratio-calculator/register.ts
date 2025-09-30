import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SortinoRatioCalculator } from './SortinoRatioCalculator';

export function registerSortinoRatioCalculator(): void {
  calculatorRegistry.register(SortinoRatioCalculator);
}

export { SortinoRatioCalculator };
