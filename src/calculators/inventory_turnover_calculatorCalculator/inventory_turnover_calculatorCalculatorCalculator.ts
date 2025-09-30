import { Calculator } from '../../engines/CalculatorEngine';
import { inventory_turnover_calculatorCalculatorInputs, inventory_turnover_calculatorCalculatorResults, inventory_turnover_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class inventory_turnover_calculatorCalculatorCalculator implements Calculator<inventory_turnover_calculatorCalculatorInputs, inventory_turnover_calculatorCalculatorResults> {
  readonly id = 'inventory_turnover_calculatorCalculator';
  readonly name = 'inventory_turnover_calculatorCalculator Calculator';
  readonly description = 'Calculate inventory_turnover_calculatorCalculator values';

  calculate(inputs: inventory_turnover_calculatorCalculatorInputs): inventory_turnover_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: inventory_turnover_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: inventory_turnover_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
