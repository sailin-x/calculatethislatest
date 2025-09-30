import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GymMembershipCostCalculator } from './GymMembershipCostCalculator';

export function registerGymMembershipCostCalculator(): void {
  calculatorRegistry.register(GymMembershipCostCalculator);
}

export { GymMembershipCostCalculator };
