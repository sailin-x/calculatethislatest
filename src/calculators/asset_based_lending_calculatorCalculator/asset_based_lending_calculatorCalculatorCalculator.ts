import { Calculator } from '../../engines/CalculatorEngine';
import { asset_based_lending_calculatorCalculatorInputs, asset_based_lending_calculatorCalculatorResults, asset_based_lending_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class asset_based_lending_calculatorCalculatorCalculator implements Calculator<asset_based_lending_calculatorCalculatorInputs, asset_based_lending_calculatorCalculatorResults> {
  readonly id = 'asset_based_lending_calculatorCalculator';
  readonly name = 'asset_based_lending_calculatorCalculator Calculator';
  readonly description = 'Calculate asset_based_lending_calculatorCalculator values';

  calculate(inputs: asset_based_lending_calculatorCalculatorInputs): asset_based_lending_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: asset_based_lending_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: asset_based_lending_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
