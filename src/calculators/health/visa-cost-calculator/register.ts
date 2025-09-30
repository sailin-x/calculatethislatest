import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VisaCostCalculator } from './VisaCostCalculator';

export function registerVisaCostCalculator(): void {
  calculatorRegistry.register(VisaCostCalculator);
}

export { VisaCostCalculator };
