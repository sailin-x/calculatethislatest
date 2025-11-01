import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debt_yield_ratioCalculator } from './debt_yield_ratioCalculator';

export function registerdebt_yield_ratioCalculator(): void {
  calculatorRegistry.register(new debt_yield_ratioCalculator());
}
