import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BookPublishingAdvanceCalculator } from './BookPublishingAdvanceCalculator';

export function registerBookPublishingAdvanceCalculator(): void {
  calculatorRegistry.register(BookPublishingAdvanceCalculator);
}

export { BookPublishingAdvanceCalculator };
