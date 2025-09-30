import { Calculator } from '../../engines/CalculatorEngine';
import { pharmaceutical_liability_calculatorCalculatorInputs, pharmaceutical_liability_calculatorCalculatorResults, pharmaceutical_liability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pharmaceutical_liability_calculatorCalculatorCalculator implements Calculator<pharmaceutical_liability_calculatorCalculatorInputs, pharmaceutical_liability_calculatorCalculatorResults> {
  readonly id = 'pharmaceutical_liability_calculatorCalculator';
  readonly name = 'pharmaceutical_liability_calculatorCalculator Calculator';
  readonly description = 'Calculate pharmaceutical_liability_calculatorCalculator values';

  calculate(inputs: pharmaceutical_liability_calculatorCalculatorInputs): pharmaceutical_liability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pharmaceutical_liability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pharmaceutical_liability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
