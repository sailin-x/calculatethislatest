import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WaccCalculator } from './WaccCalculator';

export function registerWaccCalculator(): void {
  calculatorRegistry.register(WaccCalculator);
}

export { WaccCalculator };
