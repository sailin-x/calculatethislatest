import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PersonalTrainerCostCalculator } from './PersonalTrainerCostCalculator';

export function registerPersonalTrainerCostCalculator(): void {
  calculatorRegistry.register(PersonalTrainerCostCalculator);
}

export { PersonalTrainerCostCalculator };
