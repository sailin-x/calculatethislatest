import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCurrentRatioCalculatorCalculator } from './registerCurrentRatioCalculatorCalculator';

export function registerregisterCurrentRatioCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCurrentRatioCalculatorCalculator());
}
