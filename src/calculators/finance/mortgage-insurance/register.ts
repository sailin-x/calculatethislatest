import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgageInsuranceCalculator } from './MortgageInsuranceCalculator';

export function registerMortgageInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(mortgageInsuranceCalculator);
}