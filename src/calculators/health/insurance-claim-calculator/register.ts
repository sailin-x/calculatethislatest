import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InsuranceClaimCalculator } from './InsuranceClaimCalculator';

export function registerInsuranceClaimCalculator(): void {
  calculatorRegistry.register(InsuranceClaimCalculator);
}

export { InsuranceClaimCalculator };
