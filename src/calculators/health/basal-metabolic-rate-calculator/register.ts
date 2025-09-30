import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BasalMetabolicRateCalculator } from './BasalMetabolicRateCalculator';

export function registerBasalMetabolicRateCalculator(): void {
  calculatorRegistry.register(BasalMetabolicRateCalculator);
}

export { BasalMetabolicRateCalculator };
