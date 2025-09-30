import { Calculator } from '../../engines/CalculatorEngine';
import { legal_practice_valuation_calculatorCalculatorInputs, legal_practice_valuation_calculatorCalculatorResults, legal_practice_valuation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class legal_practice_valuation_calculatorCalculatorCalculator implements Calculator<legal_practice_valuation_calculatorCalculatorInputs, legal_practice_valuation_calculatorCalculatorResults> {
  readonly id = 'legal_practice_valuation_calculatorCalculator';
  readonly name = 'legal_practice_valuation_calculatorCalculator Calculator';
  readonly description = 'Calculate legal_practice_valuation_calculatorCalculator values';

  calculate(inputs: legal_practice_valuation_calculatorCalculatorInputs): legal_practice_valuation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: legal_practice_valuation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: legal_practice_valuation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
