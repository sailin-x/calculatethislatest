import { Calculator } from '../../engines/CalculatorEngine';
import { financial_happiness_calculatorCalculatorInputs, financial_happiness_calculatorCalculatorResults, financial_happiness_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_happiness_calculatorCalculatorCalculator implements Calculator<financial_happiness_calculatorCalculatorInputs, financial_happiness_calculatorCalculatorResults> {
  readonly id = 'financial_happiness_calculatorCalculator';
  readonly name = 'financial_happiness_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_happiness_calculatorCalculator values';

  calculate(inputs: financial_happiness_calculatorCalculatorInputs): financial_happiness_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_happiness_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_happiness_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
