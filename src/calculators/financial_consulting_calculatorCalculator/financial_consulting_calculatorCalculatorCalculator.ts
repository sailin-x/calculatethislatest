import { Calculator } from '../../engines/CalculatorEngine';
import { financial_consulting_calculatorCalculatorInputs, financial_consulting_calculatorCalculatorResults, financial_consulting_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_consulting_calculatorCalculatorCalculator implements Calculator<financial_consulting_calculatorCalculatorInputs, financial_consulting_calculatorCalculatorResults> {
  readonly id = 'financial_consulting_calculatorCalculator';
  readonly name = 'financial_consulting_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_consulting_calculatorCalculator values';

  calculate(inputs: financial_consulting_calculatorCalculatorInputs): financial_consulting_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_consulting_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_consulting_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
