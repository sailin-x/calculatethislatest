import { Calculator } from '../../engines/CalculatorEngine';
import { ad_agency_commission_calculatorCalculatorInputs, ad_agency_commission_calculatorCalculatorResults, ad_agency_commission_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ad_agency_commission_calculatorCalculatorCalculator implements Calculator<ad_agency_commission_calculatorCalculatorInputs, ad_agency_commission_calculatorCalculatorResults> {
  readonly id = 'ad_agency_commission_calculatorCalculator';
  readonly name = 'ad_agency_commission_calculatorCalculator Calculator';
  readonly description = 'Calculate ad_agency_commission_calculatorCalculator values';

  calculate(inputs: ad_agency_commission_calculatorCalculatorInputs): ad_agency_commission_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ad_agency_commission_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ad_agency_commission_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
