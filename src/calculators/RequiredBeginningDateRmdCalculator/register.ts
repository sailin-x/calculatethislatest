import { calculatorRegistry } from '../../data/calculatorRegistry';
import { RequiredBeginningDateRmdCalculator } from './RequiredBeginningDateRmdCalculator';

export function registerRequiredBeginningDateRmdCalculator(): void {
  calculatorRegistry.register(new RequiredBeginningDateRmdCalculator());
}
