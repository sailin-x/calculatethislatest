import { calculatorRegistry } from '../../data/calculatorRegistry';
import { titleloancalculatorCalculator } from './titleloancalculatorCalculator';

export function registertitleloancalculatorCalculator(): void {
  calculatorRegistry.register(new titleloancalculatorCalculator());
}
