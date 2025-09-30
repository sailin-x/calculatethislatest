import { Calculator } from '../../engines/CalculatorEngine';
import { financial_compliance_calculatorCalculatorInputs, financial_compliance_calculatorCalculatorResults, financial_compliance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_compliance_calculatorCalculatorCalculator implements Calculator<financial_compliance_calculatorCalculatorInputs, financial_compliance_calculatorCalculatorResults> {
  readonly id = 'financial_compliance_calculatorCalculator';
  readonly name = 'financial_compliance_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_compliance_calculatorCalculator values';

  calculate(inputs: financial_compliance_calculatorCalculatorInputs): financial_compliance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_compliance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_compliance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
