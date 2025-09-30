import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerTitleInsuranceCalculatorCalculator } from './registerTitleInsuranceCalculatorCalculator';

export function registerregisterTitleInsuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new registerTitleInsuranceCalculatorCalculator());
}
