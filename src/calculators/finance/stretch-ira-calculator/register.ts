import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stretchiracalculatorCalculator } from './stretchiracalculatorCalculator';

export function registerstretchiracalculatorCalculator(): void {
  calculatorRegistry.register(new stretchiracalculatorCalculator());
}
