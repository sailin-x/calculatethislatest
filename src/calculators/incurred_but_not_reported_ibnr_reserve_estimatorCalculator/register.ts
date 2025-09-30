import { calculatorRegistry } from '../../data/calculatorRegistry';
import { incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator } from './incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator';

export function registerincurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new incurred_but_not_reported_ibnr_reserve_estimatorCalculatorCalculator());
}
