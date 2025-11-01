import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentVsBuyCalculator } from './registerRentVsBuyCalculator';

export function registerregisterRentVsBuyCalculator(): void {
  calculatorRegistry.register(new registerRentVsBuyCalculator());
}
