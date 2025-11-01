import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerUSDALoanCalculator } from './registerUSDALoanCalculator';

export function registerregisterUSDALoanCalculator(): void {
  calculatorRegistry.register(new registerUSDALoanCalculator());
}
