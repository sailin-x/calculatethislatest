import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerUSDALoanCalculatorCalculator } from './registerUSDALoanCalculatorCalculator';

export function registerregisterUSDALoanCalculatorCalculator(): void {
  calculatorRegistry.register(new registerUSDALoanCalculatorCalculator());
}
