import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { Chapter11BankruptcyCalculator } from './Chapter11BankruptcyCalculator';

export function registerChapter11BankruptcyCalculator(): void {
  calculatorRegistry.register(Chapter11BankruptcyCalculator);
}

export { Chapter11BankruptcyCalculator };
