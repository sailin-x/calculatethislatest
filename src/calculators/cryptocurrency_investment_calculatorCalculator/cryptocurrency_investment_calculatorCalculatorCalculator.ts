import { Calculator } from '../../engines/CalculatorEngine';
import { cryptocurrency_investment_calculatorCalculatorInputs, cryptocurrency_investment_calculatorCalculatorResults, cryptocurrency_investment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cryptocurrency_investment_calculatorCalculatorCalculator implements Calculator<cryptocurrency_investment_calculatorCalculatorInputs, cryptocurrency_investment_calculatorCalculatorResults> {
  readonly id = 'cryptocurrency_investment_calculatorCalculator';
  readonly name = 'cryptocurrency_investment_calculatorCalculator Calculator';
  readonly description = 'Calculate cryptocurrency_investment_calculatorCalculator values';

  calculate(inputs: cryptocurrency_investment_calculatorCalculatorInputs): cryptocurrency_investment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cryptocurrency_investment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cryptocurrency_investment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
