import { Calculator } from '../../engines/CalculatorEngine';
import { reit_calculatorCalculatorInputs, reit_calculatorCalculatorResults, reit_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class reit_calculatorCalculatorCalculator implements Calculator<reit_calculatorCalculatorInputs, reit_calculatorCalculatorResults> {
  readonly id = 'reit_calculatorCalculator';
  readonly name = 'reit_calculatorCalculator Calculator';
  readonly description = 'Calculate reit_calculatorCalculator values';

  calculate(inputs: reit_calculatorCalculatorInputs): reit_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: reit_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: reit_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
