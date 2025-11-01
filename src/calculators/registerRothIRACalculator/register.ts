import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRothIRACalculator } from './registerRothIRACalculator';

export function registerregisterRothIRACalculator(): void {
  calculatorRegistry.register(new registerRothIRACalculator());
}
