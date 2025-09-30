import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FitnessClassCostCalculator } from './FitnessClassCostCalculator';

export function registerFitnessClassCostCalculator(): void {
  calculatorRegistry.register(FitnessClassCostCalculator);
}

export { FitnessClassCostCalculator };
