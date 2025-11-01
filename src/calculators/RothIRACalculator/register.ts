import { calculatorRegistry } from '../../data/calculatorRegistry';
import { RothIRACalculator } from './RothIRACalculator';

export function registerRothIRACalculator(): void {
  calculatorRegistry.register(new RothIRACalculator());
}
