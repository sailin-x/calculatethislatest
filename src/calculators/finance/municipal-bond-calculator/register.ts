import { calculatorRegistry } from '../../data/calculatorRegistry';
import { municipalbondcalculatorCalculator } from './municipalbondcalculatorCalculator';

export function registermunicipalbondcalculatorCalculator(): void {
  calculatorRegistry.register(new municipalbondcalculatorCalculator());
}
