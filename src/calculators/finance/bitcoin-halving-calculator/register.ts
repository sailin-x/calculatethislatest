import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BitcoinHalvingCalculator } from './BitcoinHalvingCalculator';

export function registerBitcoinHalvingCalculator(): void {
  calculatorRegistry.register(BitcoinHalvingCalculator);
}

export { BitcoinHalvingCalculator };
