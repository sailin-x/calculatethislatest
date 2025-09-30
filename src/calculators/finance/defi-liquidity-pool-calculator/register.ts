import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DefiLiquidityPoolCalculator } from './DefiLiquidityPoolCalculator';

export function registerDefiLiquidityPoolCalculator(): void {
  calculatorRegistry.register(DefiLiquidityPoolCalculator);
}

export { DefiLiquidityPoolCalculator };
