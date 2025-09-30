import { calculatorRegistry } from '../../data/calculatorRegistry';
import { RequiredBeginningDateRmdCalculatorCalculator } from './RequiredBeginningDateRmdCalculatorCalculator';

export function registerRequiredBeginningDateRmdCalculatorCalculator(): void {
  calculatorRegistry.register(new RequiredBeginningDateRmdCalculatorCalculator());
}
