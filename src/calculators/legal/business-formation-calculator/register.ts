import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BusinessFormationCalculator } from './BusinessFormationCalculator';

export function registerBusinessFormationCalculator(): void {
  calculatorRegistry.register(BusinessFormationCalculator);
}

export { BusinessFormationCalculator };
