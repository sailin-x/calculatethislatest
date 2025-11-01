import { calculatorRegistry } from '../../data/calculatorRegistry';
import { PaycheckCalculator } from './PaycheckCalculator';

export function registerPaycheckCalculator(): void {
  calculatorRegistry.register(new PaycheckCalculator());
}
