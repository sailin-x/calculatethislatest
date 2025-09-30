import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CurrentRatioCalculatorCalculator } from './CurrentRatioCalculatorCalculator';

export function registerCurrentRatioCalculatorCalculator(): void {
  calculatorRegistry.register(new CurrentRatioCalculatorCalculator());
}
