import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { mezzanineFinancingRealEstateCalculator } from './MezzanineFinancingRealEstateCalculator';

export function registerMezzanineFinancingRealEstateCalculator(): void {
  calculatorRegistry.register(mezzanineFinancingRealEstateCalculator);
}
