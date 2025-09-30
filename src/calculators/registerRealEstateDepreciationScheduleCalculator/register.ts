import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateDepreciationScheduleCalculatorCalculator } from './registerRealEstateDepreciationScheduleCalculatorCalculator';

export function registerregisterRealEstateDepreciationScheduleCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRealEstateDepreciationScheduleCalculatorCalculator());
}
