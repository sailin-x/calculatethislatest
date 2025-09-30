import { Calculator } from '../../engines/CalculatorEngine';
import { portfolio_optimization_calculatorCalculatorInputs, portfolio_optimization_calculatorCalculatorResults, portfolio_optimization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class portfolio_optimization_calculatorCalculatorCalculator implements Calculator<portfolio_optimization_calculatorCalculatorInputs, portfolio_optimization_calculatorCalculatorResults> {
  readonly id = 'portfolio_optimization_calculatorCalculator';
  readonly name = 'portfolio_optimization_calculatorCalculator Calculator';
  readonly description = 'Calculate portfolio_optimization_calculatorCalculator values';

  calculate(inputs: portfolio_optimization_calculatorCalculatorInputs): portfolio_optimization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: portfolio_optimization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: portfolio_optimization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
