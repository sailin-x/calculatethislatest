import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BlockchainCalculator } from './BlockchainCalculator';

export function registerBlockchainCalculator(): void {
  calculatorRegistry.register(BlockchainCalculator);
}

export { BlockchainCalculator };
