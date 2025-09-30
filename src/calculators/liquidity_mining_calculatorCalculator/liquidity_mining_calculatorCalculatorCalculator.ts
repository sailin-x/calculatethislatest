import { Calculator } from '../../engines/CalculatorEngine';
import { liquidity_mining_calculatorCalculatorInputs, liquidity_mining_calculatorCalculatorResults, liquidity_mining_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class liquidity_mining_calculatorCalculatorCalculator implements Calculator<liquidity_mining_calculatorCalculatorInputs, liquidity_mining_calculatorCalculatorResults> {
  readonly id = 'liquidity_mining_calculatorCalculator';
  readonly name = 'liquidity_mining_calculatorCalculator Calculator';
  readonly description = 'Calculate liquidity_mining_calculatorCalculator values';

  calculate(inputs: liquidity_mining_calculatorCalculatorInputs): liquidity_mining_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: liquidity_mining_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: liquidity_mining_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
