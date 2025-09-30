import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { StormDamageRepairCostCalculator } from './StormDamageRepairCostCalculator';

export function registerStormDamageRepairCostCalculator(): void {
  calculatorRegistry.register(StormDamageRepairCostCalculator);
}

export { StormDamageRepairCostCalculator };
