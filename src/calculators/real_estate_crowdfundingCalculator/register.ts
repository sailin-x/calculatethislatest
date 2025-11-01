import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_crowdfundingCalculator } from './real_estate_crowdfundingCalculator';

export function registerreal_estate_crowdfundingCalculator(): void {
  calculatorRegistry.register(new real_estate_crowdfundingCalculator());
}
