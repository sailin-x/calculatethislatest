import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateWaterfallModelCalculatorCalculator } from './realEstateWaterfallModelCalculatorCalculator';

export function registerrealEstateWaterfallModelCalculatorCalculator(): void {
  calculatorRegistry.register(new realEstateWaterfallModelCalculatorCalculator());
}
