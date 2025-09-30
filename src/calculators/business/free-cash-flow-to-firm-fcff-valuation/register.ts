import { calculatorRegistry } from '../../data/calculatorRegistry';
import { freecashflowtofirmfcffvaluationCalculator } from './freecashflowtofirmfcffvaluationCalculator';

export function registerfreecashflowtofirmfcffvaluationCalculator(): void {
  calculatorRegistry.register(new freecashflowtofirmfcffvaluationCalculator());
}
