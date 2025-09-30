import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialVelocityCalculator } from './FinancialVelocityCalculator';

export function registerFinancialVelocityCalculator(): void {
  calculatorRegistry.register(FinancialVelocityCalculator);
}

export { FinancialVelocityCalculator };
