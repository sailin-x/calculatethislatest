import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cost_segregation_depreciationCalculator } from './cost_segregation_depreciationCalculator';

export function registercost_segregation_depreciationCalculator(): void {
  calculatorRegistry.register(new cost_segregation_depreciationCalculator());
}
