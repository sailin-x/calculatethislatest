import { Calculator } from '../../engines/CalculatorEngine';
import { financial_education_calculatorCalculatorInputs, financial_education_calculatorCalculatorResults, financial_education_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_education_calculatorCalculatorCalculator implements Calculator<financial_education_calculatorCalculatorInputs, financial_education_calculatorCalculatorResults> {
  readonly id = 'financial_education_calculatorCalculator';
  readonly name = 'financial_education_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_education_calculatorCalculator values';

  calculate(inputs: financial_education_calculatorCalculatorInputs): financial_education_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_education_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_education_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
