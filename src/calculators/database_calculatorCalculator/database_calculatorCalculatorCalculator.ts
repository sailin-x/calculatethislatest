import { Calculator } from '../../engines/CalculatorEngine';
import { database_calculatorCalculatorInputs, database_calculatorCalculatorResults, database_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class database_calculatorCalculatorCalculator implements Calculator<database_calculatorCalculatorInputs, database_calculatorCalculatorResults> {
  readonly id = 'database_calculatorCalculator';
  readonly name = 'database_calculatorCalculator Calculator';
  readonly description = 'Calculate database_calculatorCalculator values';

  calculate(inputs: database_calculatorCalculatorInputs): database_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: database_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: database_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
