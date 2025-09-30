import { Calculator } from '../../engines/CalculatorEngine';
import { debt_to_equity_calculatorCalculatorInputs, debt_to_equity_calculatorCalculatorResults, debt_to_equity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_to_equity_calculatorCalculatorCalculator implements Calculator<debt_to_equity_calculatorCalculatorInputs, debt_to_equity_calculatorCalculatorResults> {
  readonly id = 'debt_to_equity_calculatorCalculator';
  readonly name = 'debt_to_equity_calculatorCalculator Calculator';
  readonly description = 'Calculate debt_to_equity_calculatorCalculator values';

  calculate(inputs: debt_to_equity_calculatorCalculatorInputs): debt_to_equity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_to_equity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_to_equity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
