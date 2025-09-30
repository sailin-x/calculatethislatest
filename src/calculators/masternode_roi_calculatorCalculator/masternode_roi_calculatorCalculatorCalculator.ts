import { Calculator } from '../../engines/CalculatorEngine';
import { masternode_roi_calculatorCalculatorInputs, masternode_roi_calculatorCalculatorResults, masternode_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class masternode_roi_calculatorCalculatorCalculator implements Calculator<masternode_roi_calculatorCalculatorInputs, masternode_roi_calculatorCalculatorResults> {
  readonly id = 'masternode_roi_calculatorCalculator';
  readonly name = 'masternode_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate masternode_roi_calculatorCalculator values';

  calculate(inputs: masternode_roi_calculatorCalculatorInputs): masternode_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: masternode_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: masternode_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
