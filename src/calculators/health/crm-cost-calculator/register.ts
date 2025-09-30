import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CrmCostCalculator } from './CrmCostCalculator';

export function registerCrmCostCalculator(): void {
  calculatorRegistry.register(CrmCostCalculator);
}

export { CrmCostCalculator };
