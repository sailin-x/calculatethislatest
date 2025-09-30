import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LiquidityMiningCalculator } from './LiquidityMiningCalculator';

export function registerLiquidityMiningCalculator(): void {
  calculatorRegistry.register(LiquidityMiningCalculator);
}

export { LiquidityMiningCalculator };
