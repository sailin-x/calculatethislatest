import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IrsOfferInCompromiseCalculator } from './IrsOfferInCompromiseCalculator';

export function registerIrsOfferInCompromiseCalculator(): void {
  calculatorRegistry.register(IrsOfferInCompromiseCalculator);
}

export { IrsOfferInCompromiseCalculator };
