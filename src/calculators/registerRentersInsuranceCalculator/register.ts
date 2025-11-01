import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentersInsuranceCalculator } from './registerRentersInsuranceCalculator';

export function registerregisterRentersInsuranceCalculator(): void {
  calculatorRegistry.register(new registerRentersInsuranceCalculator());
}
