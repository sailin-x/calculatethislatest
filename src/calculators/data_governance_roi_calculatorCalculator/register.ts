import { calculatorRegistry } from '../../data/calculatorRegistry';
import { data_governance_roi_calculatorCalculatorCalculator } from './data_governance_roi_calculatorCalculatorCalculator';

export function registerdata_governance_roi_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new data_governance_roi_calculatorCalculatorCalculator());
}
