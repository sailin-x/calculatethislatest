import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PropertyInsuranceCalculator } from './PropertyInsuranceCalculator';

export function registerPropertyInsuranceCalculator(): void {
  calculatorRegistry.register(PropertyInsuranceCalculator);
}

export { PropertyInsuranceCalculator };
