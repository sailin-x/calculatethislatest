import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentersInsuranceCalculatorCalculator } from './registerRentersInsuranceCalculatorCalculator';

export function registerregisterRentersInsuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRentersInsuranceCalculatorCalculator());
}
