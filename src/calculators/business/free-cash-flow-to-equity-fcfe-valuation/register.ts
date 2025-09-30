import { calculatorRegistry } from '../../data/calculatorRegistry';
import { freecashflowtoequityfcfevaluationCalculator } from './freecashflowtoequityfcfevaluationCalculator';

export function registerfreecashflowtoequityfcfevaluationCalculator(): void {
  calculatorRegistry.register(new freecashflowtoequityfcfevaluationCalculator());
}
