import { Calculator } from '../../engines/CalculatorEngine';
import { assetprotectioncalculatorInputs, assetprotectioncalculatorResults, assetprotectioncalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class assetprotectioncalculator implements Calculator<assetprotectioncalculatorInputs, assetprotectioncalculatorResults> {
  readonly id = 'AssetProtectionCalculator';
  readonly name = 'asset protection calculator Calculator';
  readonly description = 'Calculate asset protection calculator values';

  calculate(inputs: assetprotectioncalculatorInputs): assetprotectioncalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: assetprotectioncalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: assetprotectioncalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
