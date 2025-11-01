import { calculatorRegistry } from '../../data/calculatorRegistry';
import { term_life_insuranceCalculator } from './term_life_insuranceCalculator';

export function registerterm_life_insuranceCalculator(): void {
  calculatorRegistry.register(new term_life_insuranceCalculator());
}
