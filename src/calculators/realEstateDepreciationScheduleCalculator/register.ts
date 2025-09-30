import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateDepreciationScheduleCalculatorCalculator } from './realEstateDepreciationScheduleCalculatorCalculator';

export function registerrealEstateDepreciationScheduleCalculatorCalculator(): void {
  calculatorRegistry.register(new realEstateDepreciationScheduleCalculatorCalculator());
}
