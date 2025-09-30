import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BodyAdiposityIndexCalculator } from './BodyAdiposityIndexCalculator';

export function registerBodyAdiposityIndexCalculator(): void {
  calculatorRegistry.register(BodyAdiposityIndexCalculator);
}

export { BodyAdiposityIndexCalculator };
