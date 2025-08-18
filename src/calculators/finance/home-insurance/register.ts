import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeInsuranceCalculator } from './HomeInsuranceCalculator';

export function registerHomeInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(HomeInsuranceCalculator);
}

export { HomeInsuranceCalculator };
