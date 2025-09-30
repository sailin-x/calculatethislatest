import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TrademarkRegistrationCalculator } from './TrademarkRegistrationCalculator';

export function registerTrademarkRegistrationCalculator(): void {
  calculatorRegistry.register(TrademarkRegistrationCalculator);
}

export { TrademarkRegistrationCalculator };
