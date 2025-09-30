import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cost_segregation_depreciationCalculatorCalculator } from './cost_segregation_depreciationCalculatorCalculator';

export function registercost_segregation_depreciationCalculatorCalculator(): void {
  calculatorRegistry.register(new cost_segregation_depreciationCalculatorCalculator());
}
