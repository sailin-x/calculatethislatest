import { Calculator } from '../../engines/CalculatorEngine';
import { return_on_equity_calculatorCalculatorInputs, return_on_equity_calculatorCalculatorResults, return_on_equity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class return_on_equity_calculatorCalculatorCalculator implements Calculator<return_on_equity_calculatorCalculatorInputs, return_on_equity_calculatorCalculatorResults> {
  readonly id = 'return_on_equity_calculatorCalculator';
  readonly name = 'return_on_equity_calculatorCalculator Calculator';
  readonly description = 'Calculate return_on_equity_calculatorCalculator values';

  calculate(inputs: return_on_equity_calculatorCalculatorInputs): return_on_equity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: return_on_equity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: return_on_equity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
