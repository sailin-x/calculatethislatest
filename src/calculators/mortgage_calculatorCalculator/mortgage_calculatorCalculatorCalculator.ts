import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_calculatorCalculatorInputs, mortgage_calculatorCalculatorResults, mortgage_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_calculatorCalculatorCalculator implements Calculator<mortgage_calculatorCalculatorInputs, mortgage_calculatorCalculatorResults> {
  readonly id = 'mortgage_calculatorCalculator';
  readonly name = 'mortgage_calculatorCalculator Calculator';
  readonly description = 'Calculate mortgage_calculatorCalculator values';

  calculate(inputs: mortgage_calculatorCalculatorInputs): mortgage_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
