import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CustomerSegmentationCalculator } from './CustomerSegmentationCalculator';

export function registerCustomerSegmentationCalculator(): void {
  calculatorRegistry.register(CustomerSegmentationCalculator);
}

export { CustomerSegmentationCalculator };
