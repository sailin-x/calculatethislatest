import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pmi_cancellationCalculator } from './pmi_cancellationCalculator';

export function registerpmi_cancellationCalculator(): void {
  calculatorRegistry.register(new pmi_cancellationCalculator());
}
