import { calculatorRegistry } from '../../data/calculatorRegistry';
import { crypto_staking_profitability_calculator_exists_but_needs_registrationCalculator } from './crypto_staking_profitability_calculator_exists_but_needs_registrationCalculator';

export function registercrypto_staking_profitability_calculator_exists_but_needs_registrationCalculator(): void {
  calculatorRegistry.register(new crypto_staking_profitability_calculator_exists_but_needs_registrationCalculator());
}
