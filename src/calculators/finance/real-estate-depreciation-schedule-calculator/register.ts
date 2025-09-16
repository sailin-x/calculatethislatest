import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { realEstateDepreciationScheduleCalculator } from './RealEstateDepreciationScheduleCalculator';

/**
 * Register the Real Estate Depreciation Schedule Calculator
 */
export function registerRealEstateDepreciationScheduleCalculator(): void {
  calculatorRegistry.register(realEstateDepreciationScheduleCalculator);
}