import { Calculator } from '../../engines/CalculatorEngine';
import { financial_gratitude_calculatorCalculatorInputs, financial_gratitude_calculatorCalculatorResults, financial_gratitude_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_gratitude_calculatorCalculatorCalculator implements Calculator<financial_gratitude_calculatorCalculatorInputs, financial_gratitude_calculatorCalculatorResults> {
  readonly id = 'financial_gratitude_calculatorCalculator';
  readonly name = 'financial_gratitude_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_gratitude_calculatorCalculator values';

  calculate(inputs: financial_gratitude_calculatorCalculatorInputs): financial_gratitude_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_gratitude_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_gratitude_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
