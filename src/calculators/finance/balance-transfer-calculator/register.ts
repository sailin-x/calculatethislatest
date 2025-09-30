import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BalanceTransferCalculator } from './BalanceTransferCalculator';

export function registerBalanceTransferCalculator(): void {
  calculatorRegistry.register(BalanceTransferCalculator);
}

export { BalanceTransferCalculator };
