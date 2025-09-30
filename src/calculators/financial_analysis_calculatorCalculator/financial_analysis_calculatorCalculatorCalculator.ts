import { Calculator } from '../../engines/CalculatorEngine';
import { financial_analysis_calculatorCalculatorInputs, financial_analysis_calculatorCalculatorResults, financial_analysis_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_analysis_calculatorCalculatorCalculator implements Calculator<financial_analysis_calculatorCalculatorInputs, financial_analysis_calculatorCalculatorResults> {
  readonly id = 'financial_analysis_calculatorCalculator';
  readonly name = 'financial_analysis_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_analysis_calculatorCalculator values';

  calculate(inputs: financial_analysis_calculatorCalculatorInputs): financial_analysis_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_analysis_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_analysis_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
