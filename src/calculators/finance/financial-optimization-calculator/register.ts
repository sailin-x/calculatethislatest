import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialOptimizationCalculator } from './FinancialOptimizationCalculator';

export function registerFinancialOptimizationCalculator(): void {
  calculatorRegistry.register(FinancialOptimizationCalculator);
}

export { FinancialOptimizationCalculator };
