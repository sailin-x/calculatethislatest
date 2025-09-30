import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { requiredBeginningDateRMDCalculator } from './RequiredBeginningDateRMDCalculator';

export function registerRequiredBeginningDateRmdCalculator(): void {
  calculatorRegistry.register(requiredBeginningDateRMDCalculator);
}