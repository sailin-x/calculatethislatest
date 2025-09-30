import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EngineeringCalculator } from './EngineeringCalculator';

export function registerEngineeringCalculator(): void {
  calculatorRegistry.register(EngineeringCalculator);
}

export { EngineeringCalculator };
