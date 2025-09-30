import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ReitCalculator } from './ReitCalculator';

export function registerReitCalculator(): void {
  calculatorRegistry.register(ReitCalculator);
}

export { ReitCalculator };
