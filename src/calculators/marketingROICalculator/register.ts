import { calculatorRegistry } from '../../data/calculatorRegistry';
import { marketingROICalculatorCalculator } from './marketingROICalculatorCalculator';

export function registermarketingROICalculatorCalculator(): void {
  calculatorRegistry.register(new marketingROICalculatorCalculator());
}
