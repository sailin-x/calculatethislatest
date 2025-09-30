import { Calculator } from '../../engines/CalculatorEngine';
import { tender_offer_valuation_calculatorCalculatorInputs, tender_offer_valuation_calculatorCalculatorResults, tender_offer_valuation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tender_offer_valuation_calculatorCalculatorCalculator implements Calculator<tender_offer_valuation_calculatorCalculatorInputs, tender_offer_valuation_calculatorCalculatorResults> {
  readonly id = 'tender_offer_valuation_calculatorCalculator';
  readonly name = 'tender_offer_valuation_calculatorCalculator Calculator';
  readonly description = 'Calculate tender_offer_valuation_calculatorCalculator values';

  calculate(inputs: tender_offer_valuation_calculatorCalculatorInputs): tender_offer_valuation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tender_offer_valuation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tender_offer_valuation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
