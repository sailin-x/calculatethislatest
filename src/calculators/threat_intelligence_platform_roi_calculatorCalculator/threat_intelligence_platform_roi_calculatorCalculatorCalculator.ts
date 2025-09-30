import { Calculator } from '../../engines/CalculatorEngine';
import { threat_intelligence_platform_roi_calculatorCalculatorInputs, threat_intelligence_platform_roi_calculatorCalculatorResults, threat_intelligence_platform_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class threat_intelligence_platform_roi_calculatorCalculatorCalculator implements Calculator<threat_intelligence_platform_roi_calculatorCalculatorInputs, threat_intelligence_platform_roi_calculatorCalculatorResults> {
  readonly id = 'threat_intelligence_platform_roi_calculatorCalculator';
  readonly name = 'threat_intelligence_platform_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate threat_intelligence_platform_roi_calculatorCalculator values';

  calculate(inputs: threat_intelligence_platform_roi_calculatorCalculatorInputs): threat_intelligence_platform_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: threat_intelligence_platform_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: threat_intelligence_platform_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
