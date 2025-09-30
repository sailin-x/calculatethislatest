import { Calculator } from '../../engines/CalculatorEngine';
import { break_even_analysis_calculatorCalculatorInputs, break_even_analysis_calculatorCalculatorResults, break_even_analysis_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class break_even_analysis_calculatorCalculatorCalculator implements Calculator<break_even_analysis_calculatorCalculatorInputs, break_even_analysis_calculatorCalculatorResults> {
  readonly id = 'break_even_analysis_calculatorCalculator';
  readonly name = 'break_even_analysis_calculatorCalculator Calculator';
  readonly description = 'Calculate break_even_analysis_calculatorCalculator values';

  calculate(inputs: break_even_analysis_calculatorCalculatorInputs): break_even_analysis_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: break_even_analysis_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: break_even_analysis_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
