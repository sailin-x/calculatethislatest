import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CatastropheBondPricingCalculator } from './CatastropheBondPricingCalculator';

export function registerCatastropheBondPricingCalculator(): void {
  calculatorRegistry.register(CatastropheBondPricingCalculator);
}

export { CatastropheBondPricingCalculator };
