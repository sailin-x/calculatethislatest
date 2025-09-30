import { Calculator } from '../../engines/CalculatorEngine';
import { financial_excellence_calculatorCalculatorInputs, financial_excellence_calculatorCalculatorResults, financial_excellence_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_excellence_calculatorCalculatorCalculator implements Calculator<financial_excellence_calculatorCalculatorInputs, financial_excellence_calculatorCalculatorResults> {
  readonly id = 'financial_excellence_calculatorCalculator';
  readonly name = 'financial_excellence_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_excellence_calculatorCalculator values';

  calculate(inputs: financial_excellence_calculatorCalculatorInputs): financial_excellence_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_excellence_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_excellence_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
