import { Calculator } from '../../engines/CalculatorEngine';
import { comparable_company_analysis_calculatorCalculatorInputs, comparable_company_analysis_calculatorCalculatorResults, comparable_company_analysis_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class comparable_company_analysis_calculatorCalculatorCalculator implements Calculator<comparable_company_analysis_calculatorCalculatorInputs, comparable_company_analysis_calculatorCalculatorResults> {
  readonly id = 'comparable_company_analysis_calculatorCalculator';
  readonly name = 'comparable_company_analysis_calculatorCalculator Calculator';
  readonly description = 'Calculate comparable_company_analysis_calculatorCalculator values';

  calculate(inputs: comparable_company_analysis_calculatorCalculatorInputs): comparable_company_analysis_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: comparable_company_analysis_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: comparable_company_analysis_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
