import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InternationalCellPlanCostCalculator } from './InternationalCellPlanCostCalculator';

export function registerInternationalCellPlanCostCalculator(): void {
  calculatorRegistry.register(InternationalCellPlanCostCalculator);
}

export { InternationalCellPlanCostCalculator };
