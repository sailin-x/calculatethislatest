import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MerchantCashAdvanceCalculator } from './MerchantCashAdvanceCalculator';

export function registerMerchantCashAdvanceCalculator(): void {
  calculatorRegistry.register(MerchantCashAdvanceCalculator);
}

export { MerchantCashAdvanceCalculator };
