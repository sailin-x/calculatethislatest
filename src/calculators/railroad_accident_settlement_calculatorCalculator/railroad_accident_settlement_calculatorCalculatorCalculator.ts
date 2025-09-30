import { Calculator } from '../../engines/CalculatorEngine';
import { railroad_accident_settlement_calculatorCalculatorInputs, railroad_accident_settlement_calculatorCalculatorResults, railroad_accident_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class railroad_accident_settlement_calculatorCalculatorCalculator implements Calculator<railroad_accident_settlement_calculatorCalculatorInputs, railroad_accident_settlement_calculatorCalculatorResults> {
  readonly id = 'railroad_accident_settlement_calculatorCalculator';
  readonly name = 'railroad_accident_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate railroad_accident_settlement_calculatorCalculator values';

  calculate(inputs: railroad_accident_settlement_calculatorCalculatorInputs): railroad_accident_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: railroad_accident_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: railroad_accident_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
