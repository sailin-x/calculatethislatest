import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debt_yield_ratioCalculatorCalculator } from './debt_yield_ratioCalculatorCalculator';

export function registerdebt_yield_ratioCalculatorCalculator(): void {
  calculatorRegistry.register(new debt_yield_ratioCalculatorCalculator());
}
