import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeopathyCostCalculator } from './HomeopathyCostCalculator';

export function registerHomeopathyCostCalculator(): void {
  calculatorRegistry.register(HomeopathyCostCalculator);
}

export { HomeopathyCostCalculator };
