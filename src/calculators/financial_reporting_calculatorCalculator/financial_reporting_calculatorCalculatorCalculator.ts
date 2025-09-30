import { Calculator } from '../../engines/CalculatorEngine';
import { financial_reporting_calculatorCalculatorInputs, financial_reporting_calculatorCalculatorResults, financial_reporting_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_reporting_calculatorCalculatorCalculator implements Calculator<financial_reporting_calculatorCalculatorInputs, financial_reporting_calculatorCalculatorResults> {
  readonly id = 'financial_reporting_calculatorCalculator';
  readonly name = 'financial_reporting_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_reporting_calculatorCalculator values';

  calculate(inputs: financial_reporting_calculatorCalculatorInputs): financial_reporting_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_reporting_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_reporting_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
