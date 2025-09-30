import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 401k_company_match_roiCalculatorCalculator } from './401k_company_match_roiCalculatorCalculator';

export function register401k_company_match_roiCalculatorCalculator(): void {
  calculatorRegistry.register(new 401k_company_match_roiCalculatorCalculator());
}
