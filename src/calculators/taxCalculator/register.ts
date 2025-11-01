import { calculatorRegistry } from '../../data/calculatorRegistry';
import { taxCalculator } from './taxCalculator';

export function registertaxCalculator(): void {
  calculatorRegistry.register(new taxCalculator());
}
