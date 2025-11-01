import { calculatorRegistry } from '../../data/calculatorRegistry';
import { everydayCalculator } from './everydayCalculator';

export function registereverydayCalculator(): void {
  calculatorRegistry.register(new everydayCalculator());
}
