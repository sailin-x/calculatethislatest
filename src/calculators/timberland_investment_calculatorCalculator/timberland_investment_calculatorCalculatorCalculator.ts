import { Calculator } from '../../engines/CalculatorEngine';
import { timberland_investment_calculatorCalculatorInputs, timberland_investment_calculatorCalculatorResults, timberland_investment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class timberland_investment_calculatorCalculatorCalculator implements Calculator<timberland_investment_calculatorCalculatorInputs, timberland_investment_calculatorCalculatorResults> {
  readonly id = 'timberland_investment_calculatorCalculator';
  readonly name = 'timberland_investment_calculatorCalculator Calculator';
  readonly description = 'Calculate timberland_investment_calculatorCalculator values';

  calculate(inputs: timberland_investment_calculatorCalculatorInputs): timberland_investment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: timberland_investment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: timberland_investment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
