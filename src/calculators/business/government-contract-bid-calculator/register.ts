import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GovernmentContractBidCalculator } from './GovernmentContractBidCalculator';

export function registerGovernmentContractBidCalculator(): void {
  calculatorRegistry.register(GovernmentContractBidCalculator);
}

export { GovernmentContractBidCalculator };
