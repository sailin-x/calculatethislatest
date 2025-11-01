import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGpuMiningProfitabilityCalculator } from './registerGpuMiningProfitabilityCalculator';

export function registerregisterGPUMiningProfitabilityCalculator(): void {
  calculatorRegistry.register(registerGpuMiningProfitabilityCalculator);
}
