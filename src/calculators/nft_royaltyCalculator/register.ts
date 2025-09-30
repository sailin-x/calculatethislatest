import { calculatorRegistry } from '../../data/calculatorRegistry';
import { nft_royaltyCalculatorCalculator } from './nft_royaltyCalculatorCalculator';

export function registernft_royaltyCalculatorCalculator(): void {
  calculatorRegistry.register(new nft_royaltyCalculatorCalculator());
}
