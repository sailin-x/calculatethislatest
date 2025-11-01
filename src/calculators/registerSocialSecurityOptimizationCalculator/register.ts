import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSocialSecurityOptimizationCalculator } from './registerSocialSecurityOptimizationCalculator';

export function registerregisterSocialSecurityOptimizationCalculator(): void {
  calculatorRegistry.register(new registerSocialSecurityOptimizationCalculator());
}
