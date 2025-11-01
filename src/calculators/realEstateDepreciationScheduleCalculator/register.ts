import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateDepreciationScheduleCalculator } from './realEstateDepreciationScheduleCalculator';

export function registerrealEstateDepreciationScheduleCalculator(): void {
  calculatorRegistry.register(new realEstateDepreciationScheduleCalculator());
}
