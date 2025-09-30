import { calculatorRegistry } from '../../data/calculatorRegistry';
import { comprehensiveMortgageCalculatorCalculator } from './comprehensiveMortgageCalculatorCalculator';

export function registercomprehensiveMortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new comprehensiveMortgageCalculatorCalculator());
}
