import { calculatorRegistry } from '../../data/calculatorRegistry';
import { alphaCalculator } from './alphaCalculator';

export function registeralphaCalculator(): void {
  calculatorRegistry.register(new alphaCalculator());
}
