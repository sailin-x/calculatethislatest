import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerTitleInsuranceCalculator } from './registerTitleInsuranceCalculator';

export function registerregisterTitleInsuranceCalculator(): void {
  calculatorRegistry.register(new registerTitleInsuranceCalculator());
}
