import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SalaryBenchmarkingCalculator } from './SalaryBenchmarkingCalculator';

export function registerSalaryBenchmarkingCalculator(): void {
  calculatorRegistry.register(SalaryBenchmarkingCalculator);
}

export { SalaryBenchmarkingCalculator };
