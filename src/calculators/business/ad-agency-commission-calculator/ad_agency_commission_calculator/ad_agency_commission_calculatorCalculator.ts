import { Calculator } from '../../engines/CalculatorEngine';
import { ad_agency_commission_calculatorInputs, ad_agency_commission_calculatorResults, ad_agency_commission_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_agency_commission_calculatorCalculator implements Calculator<ad_agency_commission_calculatorInputs, ad_agency_commission_calculatorResults> {
  readonly id = 'ad_agency_commission_calculator';
  readonly name = 'ad_agency_commission_calculator Calculator';
  readonly description = 'Calculate ad_agency_commission_calculator values';

  calculate(inputs: ad_agency_commission_calculatorInputs): ad_agency_commission_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_agency_commission_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_agency_commission_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
