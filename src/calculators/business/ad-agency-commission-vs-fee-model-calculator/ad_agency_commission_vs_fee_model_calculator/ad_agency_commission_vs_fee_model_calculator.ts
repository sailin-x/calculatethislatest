import { Calculator } from '../../engines/CalculatorEngine';
import { ad_agency_commission_vs_fee_model_calculatorInputs, ad_agency_commission_vs_fee_model_calculatorResults, ad_agency_commission_vs_fee_model_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_agency_commission_vs_fee_model_calculator implements Calculator<ad_agency_commission_vs_fee_model_calculatorInputs, ad_agency_commission_vs_fee_model_calculatorResults> {
  readonly id = 'ad_agency_commission_vs_fee_model_calculator';
  readonly name = 'ad_agency_commission_vs_fee_model_calculator Calculator';
  readonly description = 'Calculate ad_agency_commission_vs_fee_model_calculator values';

  calculate(inputs: ad_agency_commission_vs_fee_model_calculatorInputs): ad_agency_commission_vs_fee_model_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_agency_commission_vs_fee_model_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_agency_commission_vs_fee_model_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
