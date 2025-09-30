import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialAchievementCalculator } from './FinancialAchievementCalculator';

export function registerFinancialAchievementCalculator(): void {
  calculatorRegistry.register(FinancialAchievementCalculator);
}

export { FinancialAchievementCalculator };
