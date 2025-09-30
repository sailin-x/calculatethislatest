import { Calculator } from '../../engines/CalculatorEngine';
import { fafsa_calculatorCalculatorInputs, fafsa_calculatorCalculatorResults, fafsa_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fafsa_calculatorCalculatorCalculator implements Calculator<fafsa_calculatorCalculatorInputs, fafsa_calculatorCalculatorResults> {
  readonly id = 'fafsa_calculatorCalculator';
  readonly name = 'fafsa_calculatorCalculator Calculator';
  readonly description = 'Calculate fafsa_calculatorCalculator values';

  calculate(inputs: fafsa_calculatorCalculatorInputs): fafsa_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fafsa_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fafsa_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
