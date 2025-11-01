import { calculatorRegistry } from '../../data/calculatorRegistry';
import { self_storage_roiCalculator } from './self_storage_roiCalculator';

export function registerself_storage_roiCalculator(): void {
  calculatorRegistry.register(new self_storage_roiCalculator());
}
