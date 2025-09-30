import { calculatorRegistry } from '../../data/calculatorRegistry';
import { defi_liquidity_pool_calculatorCalculatorCalculator } from './defi_liquidity_pool_calculatorCalculatorCalculator';

export function registerdefi_liquidity_pool_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new defi_liquidity_pool_calculatorCalculatorCalculator());
}
