import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { investmentCalculator } from './InvestmentCalculator';

export function registerInvestmentCalculator(): void {
  calculatorRegistry.register(investmentCalculator);
}