import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AttributionModelsCalculator } from './AttributionModelsCalculator';

export function registerAttributionModelsCalculator(): void {
  calculatorRegistry.register(AttributionModelsCalculator);
}

export { AttributionModelsCalculator };
