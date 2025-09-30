import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hobbiesCalculatorCalculator } from './hobbiesCalculatorCalculator';

export function registerhobbiesCalculatorCalculator(): void {
  calculatorRegistry.register(new hobbiesCalculatorCalculator());
}
