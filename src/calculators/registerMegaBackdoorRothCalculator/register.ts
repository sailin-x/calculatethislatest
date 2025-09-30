import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerMegaBackdoorRothCalculatorCalculator } from './registerMegaBackdoorRothCalculatorCalculator';

export function registerregisterMegaBackdoorRothCalculatorCalculator(): void {
  calculatorRegistry.register(new registerMegaBackdoorRothCalculatorCalculator());
}
