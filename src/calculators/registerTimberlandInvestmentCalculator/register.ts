import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerTimberlandInvestmentCalculatorCalculator } from './registerTimberlandInvestmentCalculatorCalculator';

export function registerregisterTimberlandInvestmentCalculatorCalculator(): void {
  calculatorRegistry.register(new registerTimberlandInvestmentCalculatorCalculator());
}
