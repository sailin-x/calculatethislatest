import { Calculator } from '../../engines/CalculatorEngine';
import { critical_illness_calculatorCalculatorInputs, critical_illness_calculatorCalculatorResults, critical_illness_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class critical_illness_calculatorCalculatorCalculator implements Calculator<critical_illness_calculatorCalculatorInputs, critical_illness_calculatorCalculatorResults> {
  readonly id = 'critical_illness_calculatorCalculator';
  readonly name = 'critical_illness_calculatorCalculator Calculator';
  readonly description = 'Calculate critical_illness_calculatorCalculator values';

  calculate(inputs: critical_illness_calculatorCalculatorInputs): critical_illness_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: critical_illness_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: critical_illness_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
