import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SleepCalculator } from './SleepCalculator';

export function registerSleepCalculator(): void {
  calculatorRegistry.register(SleepCalculator);
}

export { SleepCalculator };
