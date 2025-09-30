import { Calculator } from '../../engines/CalculatorEngine';
import { financial_transformation_calculatorCalculatorInputs, financial_transformation_calculatorCalculatorResults, financial_transformation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_transformation_calculatorCalculatorCalculator implements Calculator<financial_transformation_calculatorCalculatorInputs, financial_transformation_calculatorCalculatorResults> {
  readonly id = 'financial_transformation_calculatorCalculator';
  readonly name = 'financial_transformation_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_transformation_calculatorCalculator values';

  calculate(inputs: financial_transformation_calculatorCalculatorInputs): financial_transformation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_transformation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_transformation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
