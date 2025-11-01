import { calculatorRegistry } from '../../data/calculatorRegistry';
import { helocCalculator } from './helocCalculator';

export function registerhelocCalculator(): void {
  calculatorRegistry.register(new helocCalculator());
}
