import { calculatorRegistry } from '../../data/calculatorRegistry';
import { corporatebondcalculatorCalculator } from './corporatebondcalculatorCalculator';

export function registercorporatebondcalculatorCalculator(): void {
  calculatorRegistry.register(new corporatebondcalculatorCalculator());
}
