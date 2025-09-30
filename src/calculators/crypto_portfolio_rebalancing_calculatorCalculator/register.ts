import { calculatorRegistry } from '../../data/calculatorRegistry';
import { crypto_portfolio_rebalancing_calculatorCalculatorCalculator } from './crypto_portfolio_rebalancing_calculatorCalculatorCalculator';

export function registercrypto_portfolio_rebalancing_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new crypto_portfolio_rebalancing_calculatorCalculatorCalculator());
}
