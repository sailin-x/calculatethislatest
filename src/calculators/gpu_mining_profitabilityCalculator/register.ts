import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gpu_mining_profitabilityCalculator } from './gpu_mining_profitabilityCalculator';

export function registergpu_mining_profitabilityCalculator(): void {
  calculatorRegistry.register(new gpu_mining_profitabilityCalculator());
}
