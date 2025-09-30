import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IntellectualPropertyCalculator } from './IntellectualPropertyCalculator';

export function registerIntellectualPropertyCalculator(): void {
  calculatorRegistry.register(IntellectualPropertyCalculator);
}

export { IntellectualPropertyCalculator };
