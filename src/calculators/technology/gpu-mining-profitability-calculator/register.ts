import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GpuMiningProfitabilityCalculator } from './GpuMiningProfitabilityCalculator';

export function registerGpuMiningProfitabilityCalculator(): void {
  calculatorRegistry.register(GpuMiningProfitabilityCalculator);
}

export { GpuMiningProfitabilityCalculator };
