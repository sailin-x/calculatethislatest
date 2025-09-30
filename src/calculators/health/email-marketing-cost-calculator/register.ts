import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EmailMarketingCostCalculator } from './EmailMarketingCostCalculator';

export function registerEmailMarketingCostCalculator(): void {
  calculatorRegistry.register(EmailMarketingCostCalculator);
}

export { EmailMarketingCostCalculator };
