import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PensionPlanFundingCalculator } from './PensionPlanFundingCalculator';

export function registerPensionPlanFundingCalculator(): void {
  calculatorRegistry.register(PensionPlanFundingCalculator);
}

export { PensionPlanFundingCalculator };
