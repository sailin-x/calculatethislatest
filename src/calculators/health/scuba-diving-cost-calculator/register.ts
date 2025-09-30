import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ScubaDivingCostCalculator } from './ScubaDivingCostCalculator';

export function registerScubaDivingCostCalculator(): void {
  calculatorRegistry.register(ScubaDivingCostCalculator);
}

export { ScubaDivingCostCalculator };
