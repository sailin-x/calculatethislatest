import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PhysicsCalculator } from './PhysicsCalculator';

export function registerPhysicsCalculator(): void {
  calculatorRegistry.register(PhysicsCalculator);
}

export { PhysicsCalculator };
