import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SocialSecurityOptimizationCalculator } from './SocialSecurityOptimizationCalculator';

export function registerSocialSecurityOptimizationCalculator(): void {
  calculatorRegistry.register(SocialSecurityOptimizationCalculator);
}

export { SocialSecurityOptimizationCalculator };
