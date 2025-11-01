import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateWaterfallModelCalculator } from './registerRealEstateWaterfallModelCalculator';

export function registerregisterRealEstateWaterfallModelCalculator(): void {
  calculatorRegistry.register(new registerRealEstateWaterfallModelCalculator());
}
