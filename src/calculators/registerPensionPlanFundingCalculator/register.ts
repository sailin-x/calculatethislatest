import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPensionPlanFundingCalculatorCalculator } from './registerPensionPlanFundingCalculatorCalculator';

export function registerregisterPensionPlanFundingCalculatorCalculator(): void {
  calculatorRegistry.register(new registerPensionPlanFundingCalculatorCalculator());
}
