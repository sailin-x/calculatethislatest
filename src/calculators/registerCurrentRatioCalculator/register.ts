import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCurrentRatioCalculator } from './registerCurrentRatioCalculator';

export function registerregisterCurrentRatioCalculator(): void {
  calculatorRegistry.register(new registerCurrentRatioCalculator());
}
