import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDtiRatioCalculator } from './registerDtiRatioCalculator';

export function registerregisterDtiRatioCalculator(): void {
  calculatorRegistry.register(new registerDtiRatioCalculator());
}
