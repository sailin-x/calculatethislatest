import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debt_to_equity_calculatorCalculatorCalculator } from './debt_to_equity_calculatorCalculatorCalculator';

export function registerdebt_to_equity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new debt_to_equity_calculatorCalculatorCalculator());
}
