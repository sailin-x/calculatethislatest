import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TradeSecretMisappropriationCalculator } from './TradeSecretMisappropriationCalculator';

export function registerTradeSecretMisappropriationCalculator(): void {
  calculatorRegistry.register(TradeSecretMisappropriationCalculator);
}

export { TradeSecretMisappropriationCalculator };
