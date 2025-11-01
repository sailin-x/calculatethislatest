import { calculatorRegistry } from '../../data/calculatorRegistry';
import { crypto_stakingCalculator } from './crypto_stakingCalculator';

export function registercrypto_stakingCalculator(): void {
  calculatorRegistry.register(new crypto_stakingCalculator());
}
