import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerInvestmentCalculator } from './registerInvestmentCalculator';

export function registerregisterInvestmentCalculator(): void {
  calculatorRegistry.register(new registerInvestmentCalculator());
}
