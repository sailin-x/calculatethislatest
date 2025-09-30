import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentersInsuranceCalculatorCalculator } from './rentersInsuranceCalculatorCalculator';

export function registerrentersInsuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new rentersInsuranceCalculatorCalculator());
}
