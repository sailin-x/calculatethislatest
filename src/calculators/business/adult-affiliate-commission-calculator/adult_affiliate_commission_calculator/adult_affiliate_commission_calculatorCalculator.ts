import { Calculator } from '../../engines/CalculatorEngine';
import { adult_affiliate_commission_calculatorInputs, adult_affiliate_commission_calculatorResults, adult_affiliate_commission_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class adult_affiliate_commission_calculatorCalculator implements Calculator<adult_affiliate_commission_calculatorInputs, adult_affiliate_commission_calculatorResults> {
  readonly id = 'adult_affiliate_commission_calculator';
  readonly name = 'adult_affiliate_commission_calculator Calculator';
  readonly description = 'Calculate adult_affiliate_commission_calculator values';

  calculate(inputs: adult_affiliate_commission_calculatorInputs): adult_affiliate_commission_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: adult_affiliate_commission_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: adult_affiliate_commission_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
