import { Calculator } from '../../engines/CalculatorEngine';
import { blockchain_calculatorCalculatorInputs, blockchain_calculatorCalculatorResults, blockchain_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class blockchain_calculatorCalculatorCalculator implements Calculator<blockchain_calculatorCalculatorInputs, blockchain_calculatorCalculatorResults> {
  readonly id = 'blockchain_calculatorCalculator';
  readonly name = 'blockchain_calculatorCalculator Calculator';
  readonly description = 'Calculate blockchain_calculatorCalculator values';

  calculate(inputs: blockchain_calculatorCalculatorInputs): blockchain_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: blockchain_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: blockchain_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
