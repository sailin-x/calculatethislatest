import { Calculator } from '../../engines/CalculatorEngine';
import { bitcoin_halving_calculatorCalculatorInputs, bitcoin_halving_calculatorCalculatorResults, bitcoin_halving_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bitcoin_halving_calculatorCalculatorCalculator implements Calculator<bitcoin_halving_calculatorCalculatorInputs, bitcoin_halving_calculatorCalculatorResults> {
  readonly id = 'bitcoin_halving_calculatorCalculator';
  readonly name = 'bitcoin_halving_calculatorCalculator Calculator';
  readonly description = 'Calculate bitcoin_halving_calculatorCalculator values';

  calculate(inputs: bitcoin_halving_calculatorCalculatorInputs): bitcoin_halving_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bitcoin_halving_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bitcoin_halving_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
