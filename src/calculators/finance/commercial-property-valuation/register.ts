import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { CommercialPropertyValuationCalculator } from './CommercialPropertyValuationCalculator';

export function registerCommercialPropertyValuationCalculator(registry: CalculatorRegistry): void {
  registry.register(CommercialPropertyValuationCalculator);
}

export { CommercialPropertyValuationCalculator };
