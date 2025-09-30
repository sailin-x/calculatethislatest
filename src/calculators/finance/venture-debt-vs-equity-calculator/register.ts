import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VentureDebtVsEquityCalculator } from './VentureDebtVsEquityCalculator';

export function registerVentureDebtVsEquityCalculator(): void {
  calculatorRegistry.register(VentureDebtVsEquityCalculator);
}

export { VentureDebtVsEquityCalculator };
