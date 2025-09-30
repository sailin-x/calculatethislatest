import { calculatorRegistry } from '../../data/calculatorRegistry';
import { portfolio_optimization_calculatorCalculatorCalculator } from './portfolio_optimization_calculatorCalculatorCalculator';

export function registerportfolio_optimization_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new portfolio_optimization_calculatorCalculatorCalculator());
}
