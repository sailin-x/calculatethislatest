import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DefiYieldOptimizationCalculator } from './DefiYieldOptimizationCalculator';

export function registerDefiYieldOptimizationCalculator(): void {
  calculatorRegistry.register(DefiYieldOptimizationCalculator);
}

export { DefiYieldOptimizationCalculator };
