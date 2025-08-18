import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { CondoInsuranceCalculator } from './CondoInsuranceCalculator';

export function registerCondoInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(CondoInsuranceCalculator);
}

export { CondoInsuranceCalculator };
