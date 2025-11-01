import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fix_and_flipCalculator } from './fix_and_flipCalculator';

export function registerfix_and_flipCalculator(): void {
  calculatorRegistry.register(new fix_and_flipCalculator());
}
