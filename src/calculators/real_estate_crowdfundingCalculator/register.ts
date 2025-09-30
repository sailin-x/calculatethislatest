import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_crowdfundingCalculatorCalculator } from './real_estate_crowdfundingCalculatorCalculator';

export function registerreal_estate_crowdfundingCalculatorCalculator(): void {
  calculatorRegistry.register(new real_estate_crowdfundingCalculatorCalculator());
}
