import { Calculator } from '../../engines/CalculatorEngine';
import { commodities_futures_profitability_calculatorCalculatorInputs, commodities_futures_profitability_calculatorCalculatorResults, commodities_futures_profitability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commodities_futures_profitability_calculatorCalculatorCalculator implements Calculator<commodities_futures_profitability_calculatorCalculatorInputs, commodities_futures_profitability_calculatorCalculatorResults> {
  readonly id = 'commodities_futures_profitability_calculatorCalculator';
  readonly name = 'commodities_futures_profitability_calculatorCalculator Calculator';
  readonly description = 'Calculate commodities_futures_profitability_calculatorCalculator values';

  calculate(inputs: commodities_futures_profitability_calculatorCalculatorInputs): commodities_futures_profitability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commodities_futures_profitability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commodities_futures_profitability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
