import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeInsuranceCalculator } from './HomeInsuranceCalculator';

export function registerHomeInsuranceCalculator(): void {
  calculatorRegistry.register(HomeInsuranceCalculator);
}

export { HomeInsuranceCalculator };
