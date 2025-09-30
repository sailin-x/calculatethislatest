import { Calculator } from '../../engines/CalculatorEngine';
import { black_litterman_calculatorCalculatorInputs, black_litterman_calculatorCalculatorResults, black_litterman_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class black_litterman_calculatorCalculatorCalculator implements Calculator<black_litterman_calculatorCalculatorInputs, black_litterman_calculatorCalculatorResults> {
  readonly id = 'black_litterman_calculatorCalculator';
  readonly name = 'black_litterman_calculatorCalculator Calculator';
  readonly description = 'Calculate black_litterman_calculatorCalculator values';

  calculate(inputs: black_litterman_calculatorCalculatorInputs): black_litterman_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: black_litterman_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: black_litterman_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
