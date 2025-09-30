import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roiCalculatorCalculator } from './roiCalculatorCalculator';

export function registerroiCalculatorCalculator(): void {
  calculatorRegistry.register(new roiCalculatorCalculator());
}
