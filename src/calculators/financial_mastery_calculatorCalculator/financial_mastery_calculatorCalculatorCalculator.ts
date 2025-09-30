import { Calculator } from '../../engines/CalculatorEngine';
import { financial_mastery_calculatorCalculatorInputs, financial_mastery_calculatorCalculatorResults, financial_mastery_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_mastery_calculatorCalculatorCalculator implements Calculator<financial_mastery_calculatorCalculatorInputs, financial_mastery_calculatorCalculatorResults> {
  readonly id = 'financial_mastery_calculatorCalculator';
  readonly name = 'financial_mastery_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_mastery_calculatorCalculator values';

  calculate(inputs: financial_mastery_calculatorCalculatorInputs): financial_mastery_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_mastery_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_mastery_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
