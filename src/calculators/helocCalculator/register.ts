import { calculatorRegistry } from '../../data/calculatorRegistry';
import { helocCalculatorCalculator } from './helocCalculatorCalculator';

export function registerhelocCalculatorCalculator(): void {
  calculatorRegistry.register(new helocCalculatorCalculator());
}
