import { calculatorRegistry } from '../../data/calculatorRegistry';
import { aptValueCalculatorCalculator } from './aptValueCalculatorCalculator';

export function registeraptValueCalculatorCalculator(): void {
  calculatorRegistry.register(new aptValueCalculatorCalculator());
}
