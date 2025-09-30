import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stockcalculatorCalculator } from './stockcalculatorCalculator';

export function registerstockcalculatorCalculator(): void {
  calculatorRegistry.register(new stockcalculatorCalculator());
}
