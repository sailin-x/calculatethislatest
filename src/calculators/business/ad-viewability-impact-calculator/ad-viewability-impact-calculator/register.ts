import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad-viewability-impact-calculatorCalculator } from './ad-viewability-impact-calculatorCalculator';

export function registerad-viewability-impact-calculatorCalculator(): void {
  calculatorRegistry.register(new ad-viewability-impact-calculatorCalculator());
}
