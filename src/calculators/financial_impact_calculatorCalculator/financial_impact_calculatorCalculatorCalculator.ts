import { Calculator } from '../../engines/CalculatorEngine';
import { financial_impact_calculatorCalculatorInputs, financial_impact_calculatorCalculatorResults, financial_impact_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_impact_calculatorCalculatorCalculator implements Calculator<financial_impact_calculatorCalculatorInputs, financial_impact_calculatorCalculatorResults> {
  readonly id = 'financial_impact_calculatorCalculator';
  readonly name = 'financial_impact_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_impact_calculatorCalculator values';

  calculate(inputs: financial_impact_calculatorCalculatorInputs): financial_impact_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_impact_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_impact_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
