import { calculatorRegistry } from '../../data/calculatorRegistry';
import { traditionaliracalculatorCalculator } from './traditionaliracalculatorCalculator';

export function registertraditionaliracalculatorCalculator(): void {
  calculatorRegistry.register(new traditionaliracalculatorCalculator());
}
