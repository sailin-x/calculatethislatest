import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pensionPlanFundingCalculator } from './pensionPlanFundingCalculator';

export function registerpensionPlanFundingCalculator(): void {
  calculatorRegistry.register(new pensionPlanFundingCalculator());
}
