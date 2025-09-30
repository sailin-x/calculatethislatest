import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pensionPlanFundingCalculatorCalculator } from './pensionPlanFundingCalculatorCalculator';

export function registerpensionPlanFundingCalculatorCalculator(): void {
  calculatorRegistry.register(new pensionPlanFundingCalculatorCalculator());
}
