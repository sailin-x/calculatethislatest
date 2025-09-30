import { calculatorRegistry } from '../../data/calculatorRegistry';
import { timberlandInvestmentCalculatorCalculator } from './timberlandInvestmentCalculatorCalculator';

export function registertimberlandInvestmentCalculatorCalculator(): void {
  calculatorRegistry.register(new timberlandInvestmentCalculatorCalculator());
}
