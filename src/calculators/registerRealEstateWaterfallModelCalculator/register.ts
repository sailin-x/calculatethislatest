import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateWaterfallModelCalculatorCalculator } from './registerRealEstateWaterfallModelCalculatorCalculator';

export function registerregisterRealEstateWaterfallModelCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRealEstateWaterfallModelCalculatorCalculator());
}
