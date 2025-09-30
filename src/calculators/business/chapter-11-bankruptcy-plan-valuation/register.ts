import { calculatorRegistry } from '../../data/calculatorRegistry';
import { chapter11bankruptcyplanvaluationCalculator } from './chapter11bankruptcyplanvaluationCalculator';

export function registerchapter11bankruptcyplanvaluationCalculator(): void {
  calculatorRegistry.register(new chapter11bankruptcyplanvaluationCalculator());
}
