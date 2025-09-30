import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { YieldFarmingCalculator } from './YieldFarmingCalculator';

export function registerYieldFarmingCalculator(): void {
  calculatorRegistry.register(YieldFarmingCalculator);
}

export { YieldFarmingCalculator };
