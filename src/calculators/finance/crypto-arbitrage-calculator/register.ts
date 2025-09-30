import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cryptoarbitragecalculatorCalculator } from './cryptoarbitragecalculatorCalculator';

export function registercryptoarbitragecalculatorCalculator(): void {
  calculatorRegistry.register(new cryptoarbitragecalculatorCalculator());
}
