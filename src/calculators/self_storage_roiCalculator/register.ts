import { calculatorRegistry } from '../../data/calculatorRegistry';
import { self_storage_roiCalculatorCalculator } from './self_storage_roiCalculatorCalculator';

export function registerself_storage_roiCalculatorCalculator(): void {
  calculatorRegistry.register(new self_storage_roiCalculatorCalculator());
}
