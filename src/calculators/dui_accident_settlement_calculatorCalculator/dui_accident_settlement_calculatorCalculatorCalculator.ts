import { Calculator } from '../../engines/CalculatorEngine';
import { dui_accident_settlement_calculatorCalculatorInputs, dui_accident_settlement_calculatorCalculatorResults, dui_accident_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dui_accident_settlement_calculatorCalculatorCalculator implements Calculator<dui_accident_settlement_calculatorCalculatorInputs, dui_accident_settlement_calculatorCalculatorResults> {
  readonly id = 'dui_accident_settlement_calculatorCalculator';
  readonly name = 'dui_accident_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate dui_accident_settlement_calculatorCalculator values';

  calculate(inputs: dui_accident_settlement_calculatorCalculatorInputs): dui_accident_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dui_accident_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dui_accident_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
