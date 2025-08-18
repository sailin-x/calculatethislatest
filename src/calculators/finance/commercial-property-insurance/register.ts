import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { CommercialPropertyInsuranceCalculator } from './CommercialPropertyInsuranceCalculator';

export function registerCommercialPropertyInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(CommercialPropertyInsuranceCalculator);
}

export { CommercialPropertyInsuranceCalculator };
