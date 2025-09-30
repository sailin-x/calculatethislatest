import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VentureDebtVsEquityFinancingCalculator } from './VentureDebtVsEquityFinancingCalculator';

export function registerVentureDebtVsEquityFinancingCalculator(): void {
  calculatorRegistry.register(VentureDebtVsEquityFinancingCalculator);
}

export { VentureDebtVsEquityFinancingCalculator };
