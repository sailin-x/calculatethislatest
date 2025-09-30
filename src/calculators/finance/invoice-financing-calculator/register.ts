import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InvoiceFinancingCalculator } from './InvoiceFinancingCalculator';

export function registerInvoiceFinancingCalculator(): void {
  calculatorRegistry.register(InvoiceFinancingCalculator);
}

export { InvoiceFinancingCalculator };
