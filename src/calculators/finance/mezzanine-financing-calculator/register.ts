import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MezzanineFinancingCalculator } from './MezzanineFinancingCalculator';

export function registerMezzanineFinancingCalculator(): void {
  calculatorRegistry.register(MezzanineFinancingCalculator);
}

export { MezzanineFinancingCalculator };
