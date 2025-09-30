import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SharpeRatioCalculator } from './SharpeRatioCalculator';

export function registerSharpeRatioCalculator(): void {
  calculatorRegistry.register(SharpeRatioCalculator);
}

export { SharpeRatioCalculator };
