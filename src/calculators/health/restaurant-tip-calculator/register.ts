import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RestaurantTipCalculator } from './RestaurantTipCalculator';

export function registerRestaurantTipCalculator(): void {
  calculatorRegistry.register(RestaurantTipCalculator);
}

export { RestaurantTipCalculator };
