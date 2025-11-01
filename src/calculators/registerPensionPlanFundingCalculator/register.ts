import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPensionPlanFundingCalculator } from './registerPensionPlanFundingCalculator';

export function registerregisterPensionPlanFundingCalculator(): void {
  calculatorRegistry.register(new registerPensionPlanFundingCalculator());
}
