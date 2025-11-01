import { Calculator } from '../../engines/CalculatorEngine';
import { affiliate_marketing_roi_calculatorInputs, affiliate_marketing_roi_calculatorResults, affiliate_marketing_roi_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class affiliate_marketing_roi_calculator implements Calculator<affiliate_marketing_roi_calculatorInputs, affiliate_marketing_roi_calculatorResults> {
  readonly id = 'affiliate_marketing_roi_calculator';
  readonly name = 'affiliate_marketing_roi_calculator Calculator';
  readonly description = 'Calculate affiliate_marketing_roi_calculator values';

  calculate(inputs: affiliate_marketing_roi_calculatorInputs): affiliate_marketing_roi_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: affiliate_marketing_roi_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: affiliate_marketing_roi_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
