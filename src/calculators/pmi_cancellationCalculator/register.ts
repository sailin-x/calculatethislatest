import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pmi_cancellationCalculatorCalculator } from './pmi_cancellationCalculatorCalculator';

export function registerpmi_cancellationCalculatorCalculator(): void {
  calculatorRegistry.register(new pmi_cancellationCalculatorCalculator());
}
