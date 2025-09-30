import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AutomotiveCalculator } from './AutomotiveCalculator';

export function registerAutomotiveCalculator(): void {
  calculatorRegistry.register(AutomotiveCalculator);
}

export { AutomotiveCalculator };
