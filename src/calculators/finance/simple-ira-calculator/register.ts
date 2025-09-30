import { calculatorRegistry } from '../../data/calculatorRegistry';
import { simpleiracalculatorCalculator } from './simpleiracalculatorCalculator';

export function registersimpleiracalculatorCalculator(): void {
  calculatorRegistry.register(new simpleiracalculatorCalculator());
}
