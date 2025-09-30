import { Calculator } from '../../engines/CalculatorEngine';
import { investment_growth_calculatorCalculatorInputs, investment_growth_calculatorCalculatorResults, investment_growth_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class investment_growth_calculatorCalculatorCalculator implements Calculator<investment_growth_calculatorCalculatorInputs, investment_growth_calculatorCalculatorResults> {
  readonly id = 'investment_growth_calculatorCalculator';
  readonly name = 'investment_growth_calculatorCalculator Calculator';
  readonly description = 'Calculate investment_growth_calculatorCalculator values';

  calculate(inputs: investment_growth_calculatorCalculatorInputs): investment_growth_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: investment_growth_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: investment_growth_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
