import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { realEstateWaterfallModelCalculator } from './RealEstateWaterfallModelCalculator';

/**
 * Register the Real Estate Waterfall Model Calculator
 */
export function registerRealEstateWaterfallModelCalculator(): void {
  calculatorRegistry.register(realEstateWaterfallModelCalculator);
}