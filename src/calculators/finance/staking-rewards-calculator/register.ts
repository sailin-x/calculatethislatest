import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { StakingRewardsCalculator } from './StakingRewardsCalculator';

export function registerStakingRewardsCalculator(): void {
  calculatorRegistry.register(StakingRewardsCalculator);
}

export { StakingRewardsCalculator };
