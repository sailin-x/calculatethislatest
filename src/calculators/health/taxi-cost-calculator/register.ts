import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TaxiCostCalculator } from './TaxiCostCalculator';

export function registerTaxiCostCalculator(): void {
  calculatorRegistry.register(TaxiCostCalculator);
}

export { TaxiCostCalculator };
