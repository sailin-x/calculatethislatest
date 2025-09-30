import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerInvestmentCalculatorCalculator } from './registerInvestmentCalculatorCalculator';

export function registerregisterInvestmentCalculatorCalculator(): void {
  calculatorRegistry.register(new registerInvestmentCalculatorCalculator());
}
