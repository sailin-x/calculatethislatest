import { Calculator } from '../../engines/CalculatorEngine';
import { compound_annual_growth_rate_calculatorCalculatorInputs, compound_annual_growth_rate_calculatorCalculatorResults, compound_annual_growth_rate_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class compound_annual_growth_rate_calculatorCalculatorCalculator implements Calculator<compound_annual_growth_rate_calculatorCalculatorInputs, compound_annual_growth_rate_calculatorCalculatorResults> {
  readonly id = 'compound_annual_growth_rate_calculatorCalculator';
  readonly name = 'compound_annual_growth_rate_calculatorCalculator Calculator';
  readonly description = 'Calculate compound_annual_growth_rate_calculatorCalculator values';

  calculate(inputs: compound_annual_growth_rate_calculatorCalculatorInputs): compound_annual_growth_rate_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: compound_annual_growth_rate_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: compound_annual_growth_rate_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
