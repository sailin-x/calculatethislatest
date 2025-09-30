import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GuidelinePremiumTestCalculator } from './GuidelinePremiumTestCalculator';

export function registerGuidelinePremiumTestCalculator(): void {
  calculatorRegistry.register(GuidelinePremiumTestCalculator);
}

export { GuidelinePremiumTestCalculator };
