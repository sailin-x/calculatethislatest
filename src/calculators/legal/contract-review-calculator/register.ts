import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ContractReviewCalculator } from './ContractReviewCalculator';

export function registerContractReviewCalculator(): void {
  calculatorRegistry.register(ContractReviewCalculator);
}

export { ContractReviewCalculator };
