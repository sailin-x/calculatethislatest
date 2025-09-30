import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RequiredBeginningDateRbdForRmdsCalculator } from './RequiredBeginningDateRbdForRmdsCalculator';

export function registerRequiredBeginningDateRbdForRmdsCalculator(): void {
  calculatorRegistry.register(RequiredBeginningDateRbdForRmdsCalculator);
}

export { RequiredBeginningDateRbdForRmdsCalculator };
