import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debt_payoff_calculatorCalculatorCalculator } from './debt_payoff_calculatorCalculatorCalculator';

export function registerdebt_payoff_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new debt_payoff_calculatorCalculatorCalculator());
}
