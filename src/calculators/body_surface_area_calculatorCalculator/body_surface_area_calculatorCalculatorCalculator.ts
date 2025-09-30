import { Calculator } from '../../engines/CalculatorEngine';
import { body_surface_area_calculatorCalculatorInputs, body_surface_area_calculatorCalculatorResults, body_surface_area_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class body_surface_area_calculatorCalculatorCalculator implements Calculator<body_surface_area_calculatorCalculatorInputs, body_surface_area_calculatorCalculatorResults> {
  readonly id = 'body_surface_area_calculatorCalculator';
  readonly name = 'body_surface_area_calculatorCalculator Calculator';
  readonly description = 'Calculate body_surface_area_calculatorCalculator values';

  calculate(inputs: body_surface_area_calculatorCalculatorInputs): body_surface_area_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: body_surface_area_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: body_surface_area_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
