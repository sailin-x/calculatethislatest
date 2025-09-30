import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RealEstateClosingCalculator } from './RealEstateClosingCalculator';

export function registerRealEstateClosingCalculator(): void {
  calculatorRegistry.register(RealEstateClosingCalculator);
}

export { RealEstateClosingCalculator };
