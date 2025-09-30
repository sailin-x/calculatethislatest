import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerGPUMiningProfitabilityCalculatorCalculator } from './registerGPUMiningProfitabilityCalculatorCalculator';

export function registerregisterGPUMiningProfitabilityCalculatorCalculator(): void {
  calculatorRegistry.register(new registerGPUMiningProfitabilityCalculatorCalculator());
}
