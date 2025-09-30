import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { Chapter11BankruptcyPlanValuation } from './Chapter11BankruptcyPlanValuation';

export function registerChapter11BankruptcyPlanValuation(): void {
  calculatorRegistry.register(Chapter11BankruptcyPlanValuation);
}

export { Chapter11BankruptcyPlanValuation };
