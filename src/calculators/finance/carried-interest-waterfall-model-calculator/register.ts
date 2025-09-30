import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CarriedInterestWaterfallModelCalculator } from './CarriedInterestWaterfallModelCalculator';

export function registerCarriedInterestWaterfallModelCalculator(): void {
  calculatorRegistry.register(CarriedInterestWaterfallModelCalculator);
}

export { CarriedInterestWaterfallModelCalculator };
