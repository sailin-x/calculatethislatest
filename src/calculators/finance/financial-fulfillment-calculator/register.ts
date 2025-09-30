import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialFulfillmentCalculator } from './FinancialFulfillmentCalculator';

export function registerFinancialFulfillmentCalculator(): void {
  calculatorRegistry.register(FinancialFulfillmentCalculator);
}

export { FinancialFulfillmentCalculator };
