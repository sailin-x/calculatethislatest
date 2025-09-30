import { calculatorRegistry } from '../../data/calculatorRegistry';
import { self_storage_facility_roi_calculatorCalculatorCalculator } from './self_storage_facility_roi_calculatorCalculatorCalculator';

export function registerself_storage_facility_roi_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new self_storage_facility_roi_calculatorCalculatorCalculator());
}
