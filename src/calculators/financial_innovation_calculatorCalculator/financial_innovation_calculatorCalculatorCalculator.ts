import { Calculator } from '../../engines/CalculatorEngine';
import { financial_innovation_calculatorCalculatorInputs, financial_innovation_calculatorCalculatorResults, financial_innovation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_innovation_calculatorCalculatorCalculator implements Calculator<financial_innovation_calculatorCalculatorInputs, financial_innovation_calculatorCalculatorResults> {
  readonly id = 'financial_innovation_calculatorCalculator';
  readonly name = 'financial_innovation_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_innovation_calculatorCalculator values';

  calculate(inputs: financial_innovation_calculatorCalculatorInputs): financial_innovation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_innovation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_innovation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
