import { calculatorRegistry } from '../../data/calculatorRegistry';
import { svodstreamingcontentlicensingvaluationCalculator } from './svodstreamingcontentlicensingvaluationCalculator';

export function registersvodstreamingcontentlicensingvaluationCalculator(): void {
  calculatorRegistry.register(new svodstreamingcontentlicensingvaluationCalculator());
}
