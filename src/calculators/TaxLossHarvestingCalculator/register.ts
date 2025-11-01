import { calculatorRegistry } from '../../data/calculatorRegistry';
import { TaxLossHarvestingCalculator } from './TaxLossHarvestingCalculator';

export function registerTaxLossHarvestingCalculator(): void {
  calculatorRegistry.register(new TaxLossHarvestingCalculator());
}
