import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LeverageRatioCalculator } from './LeverageRatioCalculator';

export function registerLeverageRatioCalculator(): void {
  calculatorRegistry.register(LeverageRatioCalculator);
}

export { LeverageRatioCalculator };
