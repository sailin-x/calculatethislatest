import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TaxLossHarvestingCalculator } from './TaxLossHarvestingCalculator';

export function registerTaxLossHarvestingCalculator(): void {
  calculatorRegistry.register(TaxLossHarvestingCalculator);
}

export { TaxLossHarvestingCalculator };
