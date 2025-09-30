import { Calculator } from '../../engines/CalculatorEngine';
import { debt_payoff_calculatorCalculatorInputs, debt_payoff_calculatorCalculatorResults, debt_payoff_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_payoff_calculatorCalculatorCalculator implements Calculator<debt_payoff_calculatorCalculatorInputs, debt_payoff_calculatorCalculatorResults> {
  readonly id = 'debt_payoff_calculatorCalculator';
  readonly name = 'debt_payoff_calculatorCalculator Calculator';
  readonly description = 'Calculate debt_payoff_calculatorCalculator values';

  calculate(inputs: debt_payoff_calculatorCalculatorInputs): debt_payoff_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_payoff_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_payoff_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
