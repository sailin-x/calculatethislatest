import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gpu_mining_profitability_calculatorCalculatorCalculator } from './gpu_mining_profitability_calculatorCalculatorCalculator';

export function registergpu_mining_profitability_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new gpu_mining_profitability_calculatorCalculatorCalculator());
}
