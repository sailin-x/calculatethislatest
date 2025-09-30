import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AdReachFrequencyCalculator } from './AdReachFrequencyCalculator';

export function registerAdReachFrequencyCalculator(): void {
  calculatorRegistry.register(AdReachFrequencyCalculator);
}

export { AdReachFrequencyCalculator };
