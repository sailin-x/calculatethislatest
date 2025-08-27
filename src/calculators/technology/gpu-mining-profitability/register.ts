import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { gpuMiningProfitabilityCalculator } from './GPUMiningProfitabilityCalculator';

export function registerGPUMiningProfitabilityCalculator(): void {
  calculatorRegistry.register(gpuMiningProfitabilityCalculator);
}
