import { calculatorRegistry } from '../../data/calculatorRegistry';
import { aptValueCalculator } from './aptValueCalculator';

export function registeraptValueCalculator(): void {
  calculatorRegistry.register(new aptValueCalculator());
}
