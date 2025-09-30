import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DebtToEquityCalculator } from './DebtToEquityCalculator';

export function registerDebtToEquityCalculator(): void {
  calculatorRegistry.register(DebtToEquityCalculator);
}

export { DebtToEquityCalculator };
