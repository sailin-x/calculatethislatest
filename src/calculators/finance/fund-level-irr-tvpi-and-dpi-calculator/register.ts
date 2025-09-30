import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FundLevelIrrTvpiAndDpiCalculator } from './FundLevelIrrTvpiAndDpiCalculator';

export function registerFundLevelIrrTvpiAndDpiCalculator(): void {
  calculatorRegistry.register(FundLevelIrrTvpiAndDpiCalculator);
}

export { FundLevelIrrTvpiAndDpiCalculator };
