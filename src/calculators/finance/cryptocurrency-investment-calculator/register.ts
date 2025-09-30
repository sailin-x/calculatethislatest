import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CryptocurrencyInvestmentCalculator } from './CryptocurrencyInvestmentCalculator';

export function registerCryptocurrencyInvestmentCalculator(): void {
  calculatorRegistry.register(CryptocurrencyInvestmentCalculator);
}

export { CryptocurrencyInvestmentCalculator };
