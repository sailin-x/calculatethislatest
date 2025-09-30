import { Calculator } from '../../engines/CalculatorEngine';
import { financial_growth_calculatorCalculatorInputs, financial_growth_calculatorCalculatorResults, financial_growth_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_growth_calculatorCalculatorCalculator implements Calculator<financial_growth_calculatorCalculatorInputs, financial_growth_calculatorCalculatorResults> {
  readonly id = 'financial_growth_calculatorCalculator';
  readonly name = 'financial_growth_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_growth_calculatorCalculator values';

  calculate(inputs: financial_growth_calculatorCalculatorInputs): financial_growth_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_growth_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_growth_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
