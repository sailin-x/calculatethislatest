import { calculatorRegistry } from '../../data/calculatorRegistry';
import { nft_royaltyCalculator } from './nft_royaltyCalculator';

export function registernft_royaltyCalculator(): void {
  calculatorRegistry.register(new nft_royaltyCalculator());
}
