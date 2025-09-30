import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerMarketingROICalculatorCalculator } from './registerMarketingROICalculatorCalculator';

export function registerregisterMarketingROICalculatorCalculator(): void {
  calculatorRegistry.register(new registerMarketingROICalculatorCalculator());
}
