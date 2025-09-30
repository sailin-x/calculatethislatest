import { Calculator } from '../../engines/CalculatorEngine';
import { asbestos_settlement_calculatorCalculatorInputs, asbestos_settlement_calculatorCalculatorResults, asbestos_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class asbestos_settlement_calculatorCalculatorCalculator implements Calculator<asbestos_settlement_calculatorCalculatorInputs, asbestos_settlement_calculatorCalculatorResults> {
  readonly id = 'asbestos_settlement_calculatorCalculator';
  readonly name = 'asbestos_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate asbestos_settlement_calculatorCalculator values';

  calculate(inputs: asbestos_settlement_calculatorCalculatorInputs): asbestos_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: asbestos_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: asbestos_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
