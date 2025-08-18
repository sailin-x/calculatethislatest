import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeownersInsuranceCalculator } from './HomeownersInsuranceCalculator';

export function registerHomeownersInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(HomeownersInsuranceCalculator);
}

export { HomeownersInsuranceCalculator };
