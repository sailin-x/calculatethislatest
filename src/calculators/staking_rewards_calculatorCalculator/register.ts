import { calculatorRegistry } from '../../data/calculatorRegistry';
import { staking_rewards_calculatorCalculatorCalculator } from './staking_rewards_calculatorCalculatorCalculator';

export function registerstaking_rewards_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new staking_rewards_calculatorCalculatorCalculator());
}
