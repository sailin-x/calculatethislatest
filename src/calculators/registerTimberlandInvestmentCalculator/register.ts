import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerTimberlandInvestmentCalculator } from './registerTimberlandInvestmentCalculator';

export function registerregisterTimberlandInvestmentCalculator(): void {
  calculatorRegistry.register(new registerTimberlandInvestmentCalculator());
}
