import { calculatorRegistry } from '../../data/calculatorRegistry';
import { celebrityendorsementdealvaluationCalculator } from './celebrityendorsementdealvaluationCalculator';

export function registercelebrityendorsementdealvaluationCalculator(): void {
  calculatorRegistry.register(new celebrityendorsementdealvaluationCalculator());
}
