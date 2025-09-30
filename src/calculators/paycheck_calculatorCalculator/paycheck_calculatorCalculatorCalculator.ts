import { Calculator } from '../../engines/CalculatorEngine';
import { paycheck_calculatorCalculatorInputs, paycheck_calculatorCalculatorResults, paycheck_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class paycheck_calculatorCalculatorCalculator implements Calculator<paycheck_calculatorCalculatorInputs, paycheck_calculatorCalculatorResults> {
  readonly id = 'paycheck_calculatorCalculator';
  readonly name = 'paycheck_calculatorCalculator Calculator';
  readonly description = 'Calculate paycheck_calculatorCalculator values';

  calculate(inputs: paycheck_calculatorCalculatorInputs): paycheck_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: paycheck_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: paycheck_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
