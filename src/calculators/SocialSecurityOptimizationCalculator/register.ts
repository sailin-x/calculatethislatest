import { calculatorRegistry } from '../../data/calculatorRegistry';
import { SocialSecurityOptimizationCalculatorCalculator } from './SocialSecurityOptimizationCalculatorCalculator';

export function registerSocialSecurityOptimizationCalculatorCalculator(): void {
  calculatorRegistry.register(new SocialSecurityOptimizationCalculatorCalculator());
}
