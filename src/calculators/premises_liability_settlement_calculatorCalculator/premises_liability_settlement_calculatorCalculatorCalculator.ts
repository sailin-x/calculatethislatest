import { Calculator } from '../../engines/CalculatorEngine';
import { premises_liability_settlement_calculatorCalculatorInputs, premises_liability_settlement_calculatorCalculatorResults, premises_liability_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class premises_liability_settlement_calculatorCalculatorCalculator implements Calculator<premises_liability_settlement_calculatorCalculatorInputs, premises_liability_settlement_calculatorCalculatorResults> {
  readonly id = 'premises_liability_settlement_calculatorCalculator';
  readonly name = 'premises_liability_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate premises_liability_settlement_calculatorCalculator values';

  calculate(inputs: premises_liability_settlement_calculatorCalculatorInputs): premises_liability_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: premises_liability_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: premises_liability_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
