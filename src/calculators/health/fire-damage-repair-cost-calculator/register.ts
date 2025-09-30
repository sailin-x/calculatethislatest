import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FireDamageRepairCostCalculator } from './FireDamageRepairCostCalculator';

export function registerFireDamageRepairCostCalculator(): void {
  calculatorRegistry.register(FireDamageRepairCostCalculator);
}

export { FireDamageRepairCostCalculator };
