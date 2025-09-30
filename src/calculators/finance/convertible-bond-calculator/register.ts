import { calculatorRegistry } from '../../data/calculatorRegistry';
import { convertiblebondcalculatorCalculator } from './convertiblebondcalculatorCalculator';

export function registerconvertiblebondcalculatorCalculator(): void {
  calculatorRegistry.register(new convertiblebondcalculatorCalculator());
}
