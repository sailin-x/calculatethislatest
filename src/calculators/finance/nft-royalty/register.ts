import { nftRoyaltyCalculator } from './NFTRoyaltyCalculator';
import { nftRoyaltyValidationRules } from './validation';
import { validateNFTRoyaltyInputs } from './validation';
import { quickValidateCollectionSize, quickValidateRoyaltyPercentage, quickValidateMintPrice } from './quickValidation';

export default {
  calculator: nftRoyaltyCalculator,
  validationRules: nftRoyaltyValidationRules,
  validate: validateNFTRoyaltyInputs,
  quickValidation: {
    collectionSize: quickValidateCollectionSize,
    royaltyPercentage: quickValidateRoyaltyPercentage,
    mintPrice: quickValidateMintPrice
  }
};
