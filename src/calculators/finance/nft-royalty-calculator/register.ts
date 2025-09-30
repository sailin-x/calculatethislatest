import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NftRoyaltyCalculator } from './NftRoyaltyCalculator';

export function registerNftRoyaltyCalculator(): void {
  calculatorRegistry.register(NftRoyaltyCalculator);
}

export { NftRoyaltyCalculator };
