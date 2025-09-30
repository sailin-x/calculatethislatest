import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad_reach_frequency_calculatorCalculator } from './ad_reach_frequency_calculatorCalculator';

export function registerad_reach_frequency_calculatorCalculator(): void {
  calculatorRegistry.register(new ad_reach_frequency_calculatorCalculator());
}
