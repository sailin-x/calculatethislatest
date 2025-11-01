import { calculatorRegistry } from '../../data/calculatorRegistry';
import { brrrr_strategyCalculator } from './brrrr_strategyCalculator';

export function registerbrrrr_strategyCalculator(): void {
  calculatorRegistry.register(new brrrr_strategyCalculator());
}
