import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateDepreciationScheduleCalculator } from './registerRealEstateDepreciationScheduleCalculator';

export function registerregisterRealEstateDepreciationScheduleCalculator(): void {
  calculatorRegistry.register(new registerRealEstateDepreciationScheduleCalculator());
}
