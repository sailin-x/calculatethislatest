import { calculatorRegistry } from '../../data/calculatorRegistry';
import { catastrophebondpricingmodelCalculator } from './catastrophebondpricingmodelCalculator';

export function registercatastrophebondpricingmodelCalculator(): void {
  calculatorRegistry.register(new catastrophebondpricingmodelCalculator());
}
