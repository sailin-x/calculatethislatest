import { Calculator } from '../../engines/CalculatorEngine';
import { financial_security_calculatorCalculatorInputs, financial_security_calculatorCalculatorResults, financial_security_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_security_calculatorCalculatorCalculator implements Calculator<financial_security_calculatorCalculatorInputs, financial_security_calculatorCalculatorResults> {
  readonly id = 'financial_security_calculatorCalculator';
  readonly name = 'financial_security_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_security_calculatorCalculator values';

  calculate(inputs: financial_security_calculatorCalculatorInputs): financial_security_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_security_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_security_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
