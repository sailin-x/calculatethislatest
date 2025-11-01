import { calculatorRegistry } from '../../data/calculatorRegistry';
import { comprehensiveMortgageCalculator } from './comprehensiveMortgageCalculator';

export function registercomprehensiveMortgageCalculator(): void {
  calculatorRegistry.register(new comprehensiveMortgageCalculator());
}
