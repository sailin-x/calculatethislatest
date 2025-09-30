import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_depreciation_schedule_calculatorCalculatorCalculator } from './real_estate_depreciation_schedule_calculatorCalculatorCalculator';

export function registerreal_estate_depreciation_schedule_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new real_estate_depreciation_schedule_calculatorCalculatorCalculator());
}
