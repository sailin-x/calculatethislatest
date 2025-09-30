import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad-reach-frequency-calculatorCalculator } from './ad-reach-frequency-calculatorCalculator';

export function registerad-reach-frequency-calculatorCalculator(): void {
  calculatorRegistry.register(new ad-reach-frequency-calculatorCalculator());
}
