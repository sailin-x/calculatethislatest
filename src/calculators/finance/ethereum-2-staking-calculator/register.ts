import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { Ethereum2StakingCalculator } from './Ethereum2StakingCalculator';

export function registerEthereum2StakingCalculator(): void {
  calculatorRegistry.register(Ethereum2StakingCalculator);
}

export { Ethereum2StakingCalculator };
