import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NftMintingCostCalculator } from './NftMintingCostCalculator';

export function registerNftMintingCostCalculator(): void {
  calculatorRegistry.register(NftMintingCostCalculator);
}

export { NftMintingCostCalculator };
