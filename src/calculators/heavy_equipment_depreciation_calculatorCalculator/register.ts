import { calculatorRegistry } from '../../data/calculatorRegistry';
import { heavy_equipment_depreciation_calculatorCalculatorCalculator } from './heavy_equipment_depreciation_calculatorCalculatorCalculator';

export function registerheavy_equipment_depreciation_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new heavy_equipment_depreciation_calculatorCalculatorCalculator());
}
