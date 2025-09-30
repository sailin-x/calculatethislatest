import { calculatorRegistry } from '../../data/calculatorRegistry';
import { PaycheckCalculatorCalculator } from './PaycheckCalculatorCalculator';

export function registerPaycheckCalculatorCalculator(): void {
  calculatorRegistry.register(new PaycheckCalculatorCalculator());
}
