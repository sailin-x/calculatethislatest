import { Calculator } from '../../engines/CalculatorEngine';
import { adult_affiliate_commission_calculatorCalculatorInputs, adult_affiliate_commission_calculatorCalculatorResults, adult_affiliate_commission_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class adult_affiliate_commission_calculatorCalculatorCalculator implements Calculator<adult_affiliate_commission_calculatorCalculatorInputs, adult_affiliate_commission_calculatorCalculatorResults> {
  readonly id = 'adult_affiliate_commission_calculatorCalculator';
  readonly name = 'adult_affiliate_commission_calculatorCalculator Calculator';
  readonly description = 'Calculate adult_affiliate_commission_calculatorCalculator values';

  calculate(inputs: adult_affiliate_commission_calculatorCalculatorInputs): adult_affiliate_commission_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: adult_affiliate_commission_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: adult_affiliate_commission_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
