import { Calculator } from '../../engines/CalculatorEngine';
import { intellectual_property_licensing_calculatorCalculatorInputs, intellectual_property_licensing_calculatorCalculatorResults, intellectual_property_licensing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class intellectual_property_licensing_calculatorCalculatorCalculator implements Calculator<intellectual_property_licensing_calculatorCalculatorInputs, intellectual_property_licensing_calculatorCalculatorResults> {
  readonly id = 'intellectual_property_licensing_calculatorCalculator';
  readonly name = 'intellectual_property_licensing_calculatorCalculator Calculator';
  readonly description = 'Calculate intellectual_property_licensing_calculatorCalculator values';

  calculate(inputs: intellectual_property_licensing_calculatorCalculatorInputs): intellectual_property_licensing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: intellectual_property_licensing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: intellectual_property_licensing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
