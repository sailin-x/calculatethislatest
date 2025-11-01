import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerMarketingROICalculator } from './registerMarketingROICalculator';

export function registerregisterMarketingROICalculator(): void {
  calculatorRegistry.register(new registerMarketingROICalculator());
}
