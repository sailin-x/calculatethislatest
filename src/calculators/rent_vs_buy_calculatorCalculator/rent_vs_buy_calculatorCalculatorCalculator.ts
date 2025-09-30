import { Calculator } from '../../engines/CalculatorEngine';
import { rent_vs_buy_calculatorCalculatorInputs, rent_vs_buy_calculatorCalculatorResults, rent_vs_buy_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rent_vs_buy_calculatorCalculatorCalculator implements Calculator<rent_vs_buy_calculatorCalculatorInputs, rent_vs_buy_calculatorCalculatorResults> {
  readonly id = 'rent_vs_buy_calculatorCalculator';
  readonly name = 'rent_vs_buy_calculatorCalculator Calculator';
  readonly description = 'Calculate rent_vs_buy_calculatorCalculator values';

  calculate(inputs: rent_vs_buy_calculatorCalculatorInputs): rent_vs_buy_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rent_vs_buy_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rent_vs_buy_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
