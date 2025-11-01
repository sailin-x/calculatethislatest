import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateWaterfallModelCalculator } from './realEstateWaterfallModelCalculator';

export function registerrealEstateWaterfallModelCalculator(): void {
  calculatorRegistry.register(new realEstateWaterfallModelCalculator());
}
