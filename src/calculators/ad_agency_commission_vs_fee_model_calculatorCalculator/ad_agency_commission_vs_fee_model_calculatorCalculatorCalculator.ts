import { Calculator } from '../../engines/CalculatorEngine';
import { ad_agency_commission_vs_fee_model_calculatorCalculatorInputs, ad_agency_commission_vs_fee_model_calculatorCalculatorResults, ad_agency_commission_vs_fee_model_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_agency_commission_vs_fee_model_calculatorCalculatorCalculator implements Calculator<ad_agency_commission_vs_fee_model_calculatorCalculatorInputs, ad_agency_commission_vs_fee_model_calculatorCalculatorResults> {
  readonly id = 'ad_agency_commission_vs_fee_model_calculatorCalculator';
  readonly name = 'ad_agency_commission_vs_fee_model_calculatorCalculator Calculator';
  readonly description = 'Calculate ad_agency_commission_vs_fee_model_calculatorCalculator values';

  calculate(inputs: ad_agency_commission_vs_fee_model_calculatorCalculatorInputs): ad_agency_commission_vs_fee_model_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_agency_commission_vs_fee_model_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_agency_commission_vs_fee_model_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
