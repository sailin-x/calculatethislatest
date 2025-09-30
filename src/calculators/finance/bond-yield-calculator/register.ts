import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bondyieldcalculatorCalculator } from './bondyieldcalculatorCalculator';

export function registerbondyieldcalculatorCalculator(): void {
  calculatorRegistry.register(new bondyieldcalculatorCalculator());
}
