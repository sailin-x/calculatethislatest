import { calculatorRegistry } from '../../data/calculatorRegistry';
import { marketingROICalculator } from './marketingROICalculator';

export function registermarketingROICalculator(): void {
  calculatorRegistry.register(new marketingROICalculator());
}
