import { Calculator } from '../../engines/CalculatorEngine';
import { home_equity_calculatorCalculatorInputs, home_equity_calculatorCalculatorResults, home_equity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class home_equity_calculatorCalculatorCalculator implements Calculator<home_equity_calculatorCalculatorInputs, home_equity_calculatorCalculatorResults> {
  readonly id = 'home_equity_calculatorCalculator';
  readonly name = 'home_equity_calculatorCalculator Calculator';
  readonly description = 'Calculate home_equity_calculatorCalculator values';

  calculate(inputs: home_equity_calculatorCalculatorInputs): home_equity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: home_equity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: home_equity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
