import { calculatorRegistry } from '../../data/calculatorRegistry';
import { attribution_models_calculatorCalculator } from './attribution_models_calculatorCalculator';

export function registerattribution_models_calculatorCalculator(): void {
  calculatorRegistry.register(new attribution_models_calculatorCalculator());
}
