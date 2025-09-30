import { calculatorRegistry } from '../../data/calculatorRegistry';
import { TaxLossHarvestingCalculatorCalculator } from './TaxLossHarvestingCalculatorCalculator';

export function registerTaxLossHarvestingCalculatorCalculator(): void {
  calculatorRegistry.register(new TaxLossHarvestingCalculatorCalculator());
}
