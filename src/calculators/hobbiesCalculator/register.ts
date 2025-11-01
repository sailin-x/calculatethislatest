import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hobbiesCalculator } from './hobbiesCalculator';

export function registerhobbiesCalculator(): void {
  calculatorRegistry.register(new hobbiesCalculator());
}
