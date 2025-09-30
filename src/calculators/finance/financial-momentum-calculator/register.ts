import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialMomentumCalculator } from './FinancialMomentumCalculator';

export function registerFinancialMomentumCalculator(): void {
  calculatorRegistry.register(FinancialMomentumCalculator);
}

export { FinancialMomentumCalculator };
