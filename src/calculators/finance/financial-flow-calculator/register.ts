import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialFlowCalculator } from './FinancialFlowCalculator';

export function registerFinancialFlowCalculator(): void {
  calculatorRegistry.register(FinancialFlowCalculator);
}

export { FinancialFlowCalculator };
