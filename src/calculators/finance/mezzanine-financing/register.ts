import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { MezzanineFinancingCalculator } from './MezzanineFinancingCalculator';

export function registerMezzanineFinancingCalculator(registry: CalculatorRegistry): void {
  registry.register(MezzanineFinancingCalculator);
}

export { MezzanineFinancingCalculator };