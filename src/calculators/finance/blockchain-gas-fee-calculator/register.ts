import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BlockchainGasFeeCalculator } from './BlockchainGasFeeCalculator';

export function registerBlockchainGasFeeCalculator(): void {
  calculatorRegistry.register(BlockchainGasFeeCalculator);
}

export { BlockchainGasFeeCalculator };
