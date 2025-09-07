import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MortgageVsRentCalculator } from './MortgageVsRentCalculator';

export function registerMortgageVsRentCalculator(): void {
  calculatorRegistry.register(MortgageVsRentCalculator);
}