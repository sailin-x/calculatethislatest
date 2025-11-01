import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CurrentRatioCalculator } from './CurrentRatioCalculator';

export function registerCurrentRatioCalculator(): void {
  calculatorRegistry.register(new CurrentRatioCalculator());
}
