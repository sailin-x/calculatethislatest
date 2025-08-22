import { cryptoStakingCalculator } from './CryptoStakingCalculator';
import { cryptoStakingValidationRules } from './validation';
import { validateCryptoStakingInputs } from './validation';
import { quickValidateStakingAmount, quickValidateAPY, quickValidateStakingPeriod } from './quickValidation';

export default {
  calculator: cryptoStakingCalculator,
  validationRules: cryptoStakingValidationRules,
  validate: validateCryptoStakingInputs,
  quickValidation: {
    stakingAmount: quickValidateStakingAmount,
    apyRate: quickValidateAPY,
    stakingPeriod: quickValidateStakingPeriod
  }
};
