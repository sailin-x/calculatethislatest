import { Calculator } from '../../engines/CalculatorEngine';
import { irs_offer_in_compromise_oic_calculatorCalculatorInputs, irs_offer_in_compromise_oic_calculatorCalculatorResults, irs_offer_in_compromise_oic_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class irs_offer_in_compromise_oic_calculatorCalculatorCalculator implements Calculator<irs_offer_in_compromise_oic_calculatorCalculatorInputs, irs_offer_in_compromise_oic_calculatorCalculatorResults> {
  readonly id = 'irs_offer_in_compromise_oic_calculatorCalculator';
  readonly name = 'irs_offer_in_compromise_oic_calculatorCalculator Calculator';
  readonly description = 'Calculate irs_offer_in_compromise_oic_calculatorCalculator values';

  calculate(inputs: irs_offer_in_compromise_oic_calculatorCalculatorInputs): irs_offer_in_compromise_oic_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: irs_offer_in_compromise_oic_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: irs_offer_in_compromise_oic_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
