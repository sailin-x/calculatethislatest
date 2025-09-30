import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MarineCargoCalculator } from './MarineCargoCalculator';

export function registerMarineCargoCalculator(): void {
  calculatorRegistry.register(MarineCargoCalculator);
}

export { MarineCargoCalculator };
