import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CommercialFleetInsuranceCalculator } from './CommercialFleetInsuranceCalculator';

export function registerCommercialFleetInsuranceCalculator(): void {
  calculatorRegistry.register(CommercialFleetInsuranceCalculator);
}

export { CommercialFleetInsuranceCalculator };
