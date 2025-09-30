import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CelebrityEndorsementCalculator } from './CelebrityEndorsementCalculator';

export function registerCelebrityEndorsementCalculator(): void {
  calculatorRegistry.register(CelebrityEndorsementCalculator);
}

export { CelebrityEndorsementCalculator };
