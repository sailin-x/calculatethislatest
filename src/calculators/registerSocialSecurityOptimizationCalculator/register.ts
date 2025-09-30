import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSocialSecurityOptimizationCalculatorCalculator } from './registerSocialSecurityOptimizationCalculatorCalculator';

export function registerregisterSocialSecurityOptimizationCalculatorCalculator(): void {
  calculatorRegistry.register(new registerSocialSecurityOptimizationCalculatorCalculator());
}
