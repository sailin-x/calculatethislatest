import { Calculator } from '../../engines/CalculatorEngine';
import { ebitda_calculatorCalculatorInputs, ebitda_calculatorCalculatorResults, ebitda_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ebitda_calculatorCalculatorCalculator implements Calculator<ebitda_calculatorCalculatorInputs, ebitda_calculatorCalculatorResults> {
  readonly id = 'ebitda_calculatorCalculator';
  readonly name = 'ebitda_calculatorCalculator Calculator';
  readonly description = 'Calculate ebitda_calculatorCalculator values';

  calculate(inputs: ebitda_calculatorCalculatorInputs): ebitda_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ebitda_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ebitda_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
