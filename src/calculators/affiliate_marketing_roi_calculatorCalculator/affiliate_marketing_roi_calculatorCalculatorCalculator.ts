import { Calculator } from '../../engines/CalculatorEngine';
import { affiliate_marketing_roi_calculatorCalculatorInputs, affiliate_marketing_roi_calculatorCalculatorResults, affiliate_marketing_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class affiliate_marketing_roi_calculatorCalculatorCalculator implements Calculator<affiliate_marketing_roi_calculatorCalculatorInputs, affiliate_marketing_roi_calculatorCalculatorResults> {
  readonly id = 'affiliate_marketing_roi_calculatorCalculator';
  readonly name = 'affiliate_marketing_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate affiliate_marketing_roi_calculatorCalculator values';

  calculate(inputs: affiliate_marketing_roi_calculatorCalculatorInputs): affiliate_marketing_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: affiliate_marketing_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: affiliate_marketing_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
