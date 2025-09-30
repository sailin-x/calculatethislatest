import { Calculator } from '../../engines/CalculatorEngine';
import { financial_momentum_calculatorCalculatorInputs, financial_momentum_calculatorCalculatorResults, financial_momentum_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_momentum_calculatorCalculatorCalculator implements Calculator<financial_momentum_calculatorCalculatorInputs, financial_momentum_calculatorCalculatorResults> {
  readonly id = 'financial_momentum_calculatorCalculator';
  readonly name = 'financial_momentum_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_momentum_calculatorCalculator values';

  calculate(inputs: financial_momentum_calculatorCalculatorInputs): financial_momentum_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_momentum_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_momentum_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
