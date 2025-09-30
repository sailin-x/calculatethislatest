import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRequiredBeginningDateRmdCalculatorCalculator } from './registerRequiredBeginningDateRmdCalculatorCalculator';

export function registerregisterRequiredBeginningDateRmdCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRequiredBeginningDateRmdCalculatorCalculator());
}
