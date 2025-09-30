import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_refinance_calculatorCalculatorInputs, mortgage_refinance_calculatorCalculatorResults, mortgage_refinance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_refinance_calculatorCalculatorCalculator implements Calculator<mortgage_refinance_calculatorCalculatorInputs, mortgage_refinance_calculatorCalculatorResults> {
  readonly id = 'mortgage_refinance_calculatorCalculator';
  readonly name = 'mortgage_refinance_calculatorCalculator Calculator';
  readonly description = 'Calculate mortgage_refinance_calculatorCalculator values';

  calculate(inputs: mortgage_refinance_calculatorCalculatorInputs): mortgage_refinance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_refinance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_refinance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
