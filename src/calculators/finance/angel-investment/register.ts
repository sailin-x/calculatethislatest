import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AngelInvestmentCalculator } from './AngelInvestmentCalculator';

export function registerAngelInvestmentCalculator() {
  calculatorRegistry.register(AngelInvestmentCalculator);
}
