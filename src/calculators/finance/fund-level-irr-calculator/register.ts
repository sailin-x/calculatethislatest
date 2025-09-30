import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FundLevelIrrCalculator } from './FundLevelIrrCalculator';

export function registerFundLevelIrrCalculator(): void {
  calculatorRegistry.register(FundLevelIrrCalculator);
}

export { FundLevelIrrCalculator };
