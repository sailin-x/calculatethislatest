import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRequiredBeginningDateRmdCalculator } from './registerRequiredBeginningDateRmdCalculator';

export function registerregisterRequiredBeginningDateRmdCalculator(): void {
  calculatorRegistry.register(new registerRequiredBeginningDateRmdCalculator());
}
