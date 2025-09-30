import { Calculator } from '../../engines/CalculatorEngine';
import { private_equity_returns_calculatorCalculatorInputs, private_equity_returns_calculatorCalculatorResults, private_equity_returns_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class private_equity_returns_calculatorCalculatorCalculator implements Calculator<private_equity_returns_calculatorCalculatorInputs, private_equity_returns_calculatorCalculatorResults> {
  readonly id = 'private_equity_returns_calculatorCalculator';
  readonly name = 'private_equity_returns_calculatorCalculator Calculator';
  readonly description = 'Calculate private_equity_returns_calculatorCalculator values';

  calculate(inputs: private_equity_returns_calculatorCalculatorInputs): private_equity_returns_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: private_equity_returns_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: private_equity_returns_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
