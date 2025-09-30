import { Calculator } from '../../engines/CalculatorEngine';
import { hit_and_run_settlement_calculatorCalculatorInputs, hit_and_run_settlement_calculatorCalculatorResults, hit_and_run_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hit_and_run_settlement_calculatorCalculatorCalculator implements Calculator<hit_and_run_settlement_calculatorCalculatorInputs, hit_and_run_settlement_calculatorCalculatorResults> {
  readonly id = 'hit_and_run_settlement_calculatorCalculator';
  readonly name = 'hit_and_run_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate hit_and_run_settlement_calculatorCalculator values';

  calculate(inputs: hit_and_run_settlement_calculatorCalculatorInputs): hit_and_run_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hit_and_run_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hit_and_run_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
