import { Calculator } from '../../engines/CalculatorEngine';
import { modified_dietz_return_calculatorCalculatorInputs, modified_dietz_return_calculatorCalculatorResults, modified_dietz_return_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class modified_dietz_return_calculatorCalculatorCalculator implements Calculator<modified_dietz_return_calculatorCalculatorInputs, modified_dietz_return_calculatorCalculatorResults> {
  readonly id = 'modified_dietz_return_calculatorCalculator';
  readonly name = 'modified_dietz_return_calculatorCalculator Calculator';
  readonly description = 'Calculate modified_dietz_return_calculatorCalculator values';

  calculate(inputs: modified_dietz_return_calculatorCalculatorInputs): modified_dietz_return_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: modified_dietz_return_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: modified_dietz_return_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
