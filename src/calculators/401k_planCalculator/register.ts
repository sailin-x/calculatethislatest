import { calculatorRegistry } from '../../data/calculatorRegistry';
import { K401kPlanCalculatorCalculator } from './401k_planCalculatorCalculator';

export function register401k_planCalculatorCalculator(): void {
  calculatorRegistry.register(new K401kPlanCalculatorCalculator());
}
