import { calculatorRegistry } from '../../data/calculatorRegistry';
import { timberlandInvestmentCalculator } from './timberlandInvestmentCalculator';

export function registertimberlandInvestmentCalculator(): void {
  calculatorRegistry.register(new timberlandInvestmentCalculator());
}
