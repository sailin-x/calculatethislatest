import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDtiRatioCalculatorCalculator } from './registerDtiRatioCalculatorCalculator';

export function registerregisterDtiRatioCalculatorCalculator(): void {
  calculatorRegistry.register(new registerDtiRatioCalculatorCalculator());
}
