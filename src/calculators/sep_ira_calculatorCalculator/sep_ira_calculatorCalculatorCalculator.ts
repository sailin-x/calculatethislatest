import { Calculator } from '../../engines/CalculatorEngine';
import { sep_ira_calculatorCalculatorInputs, sep_ira_calculatorCalculatorResults, sep_ira_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class sep_ira_calculatorCalculatorCalculator implements Calculator<sep_ira_calculatorCalculatorInputs, sep_ira_calculatorCalculatorResults> {
  readonly id = 'sep_ira_calculatorCalculator';
  readonly name = 'sep_ira_calculatorCalculator Calculator';
  readonly description = 'Calculate sep_ira_calculatorCalculator values';

  calculate(inputs: sep_ira_calculatorCalculatorInputs): sep_ira_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: sep_ira_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: sep_ira_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
