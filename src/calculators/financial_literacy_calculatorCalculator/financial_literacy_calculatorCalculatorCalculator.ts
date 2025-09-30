import { Calculator } from '../../engines/CalculatorEngine';
import { financial_literacy_calculatorCalculatorInputs, financial_literacy_calculatorCalculatorResults, financial_literacy_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_literacy_calculatorCalculatorCalculator implements Calculator<financial_literacy_calculatorCalculatorInputs, financial_literacy_calculatorCalculatorResults> {
  readonly id = 'financial_literacy_calculatorCalculator';
  readonly name = 'financial_literacy_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_literacy_calculatorCalculator values';

  calculate(inputs: financial_literacy_calculatorCalculatorInputs): financial_literacy_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_literacy_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_literacy_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
