import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hoa_feeCalculator } from './hoa_feeCalculator';

export function registerhoa_feeCalculator(): void {
  calculatorRegistry.register(new hoa_feeCalculator());
}
