import { Calculator } from '../../engines/CalculatorEngine';
import { financial_intelligence_calculatorCalculatorInputs, financial_intelligence_calculatorCalculatorResults, financial_intelligence_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_intelligence_calculatorCalculatorCalculator implements Calculator<financial_intelligence_calculatorCalculatorInputs, financial_intelligence_calculatorCalculatorResults> {
  readonly id = 'financial_intelligence_calculatorCalculator';
  readonly name = 'financial_intelligence_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_intelligence_calculatorCalculator values';

  calculate(inputs: financial_intelligence_calculatorCalculatorInputs): financial_intelligence_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_intelligence_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_intelligence_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
