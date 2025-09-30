import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BusinessProcessReEngineeringCalculator } from './BusinessProcessReEngineeringCalculator';

export function registerBusinessProcessReEngineeringCalculator(): void {
  calculatorRegistry.register(BusinessProcessReEngineeringCalculator);
}

export { BusinessProcessReEngineeringCalculator };
