import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DtiRatioCalculatorCalculator } from './DtiRatioCalculatorCalculator';

export function registerDtiRatioCalculatorCalculator(): void {
  calculatorRegistry.register(new DtiRatioCalculatorCalculator());
}
