import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fourZeroOneKCompanyMatchRoiCalculator } from './fourZeroOneKCompanyMatchRoiCalculator';

export function registerfourZeroOneKCompanyMatchRoiCalculator(): void {
  calculatorRegistry.register(new fourZeroOneKCompanyMatchRoiCalculator());
}
