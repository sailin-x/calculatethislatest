import { Calculator } from '../../engines/CalculatorEngine';
import { cd_interest_calculatorCalculatorInputs, cd_interest_calculatorCalculatorResults, cd_interest_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cd_interest_calculatorCalculatorCalculator implements Calculator<cd_interest_calculatorCalculatorInputs, cd_interest_calculatorCalculatorResults> {
  readonly id = 'cd_interest_calculatorCalculator';
  readonly name = 'cd_interest_calculatorCalculator Calculator';
  readonly description = 'Calculate cd_interest_calculatorCalculator values';

  calculate(inputs: cd_interest_calculatorCalculatorInputs): cd_interest_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cd_interest_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cd_interest_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
