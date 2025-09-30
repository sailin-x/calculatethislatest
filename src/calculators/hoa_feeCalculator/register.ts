import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hoa_feeCalculatorCalculator } from './hoa_feeCalculatorCalculator';

export function registerhoa_feeCalculatorCalculator(): void {
  calculatorRegistry.register(new hoa_feeCalculatorCalculator());
}
