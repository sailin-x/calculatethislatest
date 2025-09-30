import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IndustryBenchmarkingCalculator } from './IndustryBenchmarkingCalculator';

export function registerIndustryBenchmarkingCalculator(): void {
  calculatorRegistry.register(IndustryBenchmarkingCalculator);
}

export { IndustryBenchmarkingCalculator };
