import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TermVsUniversalLifeCalculator } from './TermVsUniversalLifeCalculator';

export function registerTermVsUniversalLifeCalculator(): void {
  calculatorRegistry.register(TermVsUniversalLifeCalculator);
}

export { TermVsUniversalLifeCalculator };
