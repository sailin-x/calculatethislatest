import { calculatorRegistry } from '../../data/calculatorRegistry';
import { megaBackdoorRothCalculatorCalculator } from './megaBackdoorRothCalculatorCalculator';

export function registermegaBackdoorRothCalculatorCalculator(): void {
  calculatorRegistry.register(new megaBackdoorRothCalculatorCalculator());
}
