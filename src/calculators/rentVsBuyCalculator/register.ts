import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentVsBuyCalculator } from './rentVsBuyCalculator';

export function registerrentVsBuyCalculator(): void {
  calculatorRegistry.register(new rentVsBuyCalculator());
}
