import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PrivateMortgageInsuranceCalculator } from './PrivateMortgageInsuranceCalculator';

export function registerPrivateMortgageInsuranceCalculator(): void {
  calculatorRegistry.register(PrivateMortgageInsuranceCalculator);
}