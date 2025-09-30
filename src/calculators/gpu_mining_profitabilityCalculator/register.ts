import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gpu_mining_profitabilityCalculatorCalculator } from './gpu_mining_profitabilityCalculatorCalculator';

export function registergpu_mining_profitabilityCalculatorCalculator(): void {
  calculatorRegistry.register(new gpu_mining_profitabilityCalculatorCalculator());
}
