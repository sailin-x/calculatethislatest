import { Calculator } from '../../engines/CalculatorEngine';
import { emergency_fund_calculatorCalculatorInputs, emergency_fund_calculatorCalculatorResults, emergency_fund_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class emergency_fund_calculatorCalculatorCalculator implements Calculator<emergency_fund_calculatorCalculatorInputs, emergency_fund_calculatorCalculatorResults> {
  readonly id = 'emergency_fund_calculatorCalculator';
  readonly name = 'emergency_fund_calculatorCalculator Calculator';
  readonly description = 'Calculate emergency_fund_calculatorCalculator values';

  calculate(inputs: emergency_fund_calculatorCalculatorInputs): emergency_fund_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: emergency_fund_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: emergency_fund_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
