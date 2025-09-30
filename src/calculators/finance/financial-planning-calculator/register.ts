import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialPlanningCalculator } from './FinancialPlanningCalculator';

export function registerFinancialPlanningCalculator(): void {
  calculatorRegistry.register(FinancialPlanningCalculator);
}

export { FinancialPlanningCalculator };
