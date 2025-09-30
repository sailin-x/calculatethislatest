import { Calculator } from '../../engines/CalculatorEngine';
import { roth_401k_vs_traditional_401k_calculatorCalculatorInputs, roth_401k_vs_traditional_401k_calculatorCalculatorResults, roth_401k_vs_traditional_401k_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roth_401k_vs_traditional_401k_calculatorCalculatorCalculator implements Calculator<roth_401k_vs_traditional_401k_calculatorCalculatorInputs, roth_401k_vs_traditional_401k_calculatorCalculatorResults> {
  readonly id = 'roth_401k_vs_traditional_401k_calculatorCalculator';
  readonly name = 'roth_401k_vs_traditional_401k_calculatorCalculator Calculator';
  readonly description = 'Calculate roth_401k_vs_traditional_401k_calculatorCalculator values';

  calculate(inputs: roth_401k_vs_traditional_401k_calculatorCalculatorInputs): roth_401k_vs_traditional_401k_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roth_401k_vs_traditional_401k_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roth_401k_vs_traditional_401k_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
