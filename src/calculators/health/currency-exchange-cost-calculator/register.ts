import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CurrencyExchangeCostCalculator } from './CurrencyExchangeCostCalculator';

export function registerCurrencyExchangeCostCalculator(): void {
  calculatorRegistry.register(CurrencyExchangeCostCalculator);
}

export { CurrencyExchangeCostCalculator };
