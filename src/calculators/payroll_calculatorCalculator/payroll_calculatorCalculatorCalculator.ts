import { Calculator } from '../../engines/CalculatorEngine';
import { payroll_calculatorCalculatorInputs, payroll_calculatorCalculatorResults, payroll_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class payroll_calculatorCalculatorCalculator implements Calculator<payroll_calculatorCalculatorInputs, payroll_calculatorCalculatorResults> {
  readonly id = 'payroll_calculatorCalculator';
  readonly name = 'payroll_calculatorCalculator Calculator';
  readonly description = 'Calculate payroll_calculatorCalculator values';

  calculate(inputs: payroll_calculatorCalculatorInputs): payroll_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: payroll_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: payroll_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
