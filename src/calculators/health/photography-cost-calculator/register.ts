import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PhotographyCostCalculator } from './PhotographyCostCalculator';

export function registerPhotographyCostCalculator(): void {
  calculatorRegistry.register(PhotographyCostCalculator);
}

export { PhotographyCostCalculator };
