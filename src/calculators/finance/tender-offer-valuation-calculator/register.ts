import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TenderOfferValuationCalculator } from './TenderOfferValuationCalculator';

export function registerTenderOfferValuationCalculator(): void {
  calculatorRegistry.register(TenderOfferValuationCalculator);
}

export { TenderOfferValuationCalculator };
