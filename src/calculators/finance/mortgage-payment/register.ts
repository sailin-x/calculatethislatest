import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgagePaymentCalculator } from './MortgagePaymentCalculator';

export function registerMortgagePaymentCalculator(registry: CalculatorRegistry): void {
  registry.register(mortgagePaymentCalculator);
}