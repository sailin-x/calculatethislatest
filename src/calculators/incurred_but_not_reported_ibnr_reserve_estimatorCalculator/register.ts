import { calculatorRegistry } from '../../data/calculatorRegistry';
import { incurred_but_not_reported_ibnr_reserve_estimatorCalculator } from './incurred_but_not_reported_ibnr_reserve_estimatorCalculator';

export function registerincurred_but_not_reported_ibnr_reserve_estimatorCalculator(): void {
  calculatorRegistry.register(new incurred_but_not_reported_ibnr_reserve_estimatorCalculator());
}
