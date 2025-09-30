import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SocialMediaCostCalculator } from './SocialMediaCostCalculator';

export function registerSocialMediaCostCalculator(): void {
  calculatorRegistry.register(SocialMediaCostCalculator);
}

export { SocialMediaCostCalculator };
