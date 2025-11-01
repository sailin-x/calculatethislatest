import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentersInsuranceCalculator } from './rentersInsuranceCalculator';

export function registerrentersInsuranceCalculator(): void {
  calculatorRegistry.register(new rentersInsuranceCalculator());
}
