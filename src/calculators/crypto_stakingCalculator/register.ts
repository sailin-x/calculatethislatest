import { calculatorRegistry } from '../../data/calculatorRegistry';
import { crypto_stakingCalculatorCalculator } from './crypto_stakingCalculatorCalculator';

export function registercrypto_stakingCalculatorCalculator(): void {
  calculatorRegistry.register(new crypto_stakingCalculatorCalculator());
}
