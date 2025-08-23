export function quickValidateCollectionSize(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Collection size is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Collection size must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Collection size must be positive' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Collection size must be at least 1' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Collection size cannot exceed 1,000,000' };
  }
  
  // Collection type specific validation
  const collectionType = allInputs?.collectionType;
  if (collectionType === 'art' && numValue > 100) {
    return { 
      isValid: false, 
      message: '1/1 Art collections typically have smaller sizes (≤100)' 
    };
  }
  
  if (collectionType === 'pfp' && numValue < 1000) {
    return { 
      isValid: false, 
      message: 'PFP collections typically have larger sizes (≥1,000)' 
    };
  }
  
  return { isValid: true };
}

export function quickValidateRoyaltyPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Royalty percentage is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Royalty percentage must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Royalty percentage must be positive' };
  }
  
  if (numValue < 0.1) {
    return { isValid: false, message: 'Royalty percentage must be at least 0.1%' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Royalty percentage cannot exceed 50%' };
  }
  
  if (numValue > 10) {
    return { 
      isValid: false, 
      message: 'Royalty percentage above 10% may discourage trading' 
    };
  }
  
  // Collection type specific validation
  const collectionType = allInputs?.collectionType;
  if (collectionType === 'art' && numValue > 15) {
    return { 
      isValid: false, 
      message: 'Even art collections rarely justify royalties above 15%' 
    };
  }
  
  if (collectionType === 'utility' && numValue > 5) {
    return { 
      isValid: false, 
      message: 'Utility NFTs should have lower royalties (≤5%) to encourage usage' 
    };
  }
  
  return { isValid: true };
}

export function quickValidateMintPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Mint price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Mint price must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Mint price must be positive' };
  }
  
  if (numValue < 0.001) {
    return { isValid: false, message: 'Mint price must be at least $0.001' };
  }
  
  if (numValue > 10000) {
    return { isValid: false, message: 'Mint price cannot exceed $10,000' };
  }
  
  return { isValid: true };
}

export function quickValidateAverageResalePrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Average resale price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Average resale price must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Average resale price must be positive' };
  }
  
  if (numValue < 0.001) {
    return { isValid: false, message: 'Average resale price must be at least $0.001' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Average resale price cannot exceed $100,000' };
  }
  
  // Validate against mint price
  const mintPrice = allInputs?.mintPrice;
  if (mintPrice && numValue < mintPrice * 0.3) {
    return { 
      isValid: false, 
      message: 'Resale price significantly below mint price indicates weak demand' 
    };
  }
  
  if (mintPrice && numValue > mintPrice * 50) {
    return { 
      isValid: false, 
      message: 'Resale price appears unrealistically high compared to mint price' 
    };
  }
  
  return { isValid: true };
}

export function quickValidateMonthlyTrades(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Monthly trades is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Monthly trades must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Monthly trades cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Monthly trades cannot exceed 100,000' };
  }
  
  // Validate against collection size
  const collectionSize = allInputs?.collectionSize;
  if (collectionSize && numValue > collectionSize) {
    return { 
      isValid: false, 
      message: 'Monthly trades cannot exceed collection size (unrealistic turnover)' 
    };
  }
  
  return { isValid: true };
}

export function quickValidateFloorPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Floor price must be a valid number' };
  }
  
  if (numValue <= 0) {
    return { isValid: false, message: 'Floor price must be positive' };
  }
  
  if (numValue < 0.001) {
    return { isValid: false, message: 'Floor price must be at least $0.001' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Floor price cannot exceed $100,000' };
  }
  
  // Validate against average resale price
  const averageResalePrice = allInputs?.averageResalePrice;
  if (averageResalePrice && numValue > averageResalePrice * 1.5) {
    return { 
      isValid: false, 
      message: 'Floor price should generally be lower than average resale price' 
    };
  }
  
  return { isValid: true };
}

export function quickValidateCustomMarketplaceFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const marketplace = allInputs?.marketplace;
  
  if (marketplace !== 'custom') {
    return { isValid: true }; // Not needed for non-custom marketplaces
  }
  
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Custom marketplace fee is required for custom marketplace' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Custom marketplace fee must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Custom marketplace fee cannot be negative' };
  }
  
  if (numValue > 20) {
    return { isValid: false, message: 'Custom marketplace fee cannot exceed 20%' };
  }
  
  return { isValid: true };
}

export function quickValidateUtilityRevenue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const includeUtilityRevenue = allInputs?.includeUtilityRevenue;
  
  if (!includeUtilityRevenue) {
    return { isValid: true }; // Not needed when utility revenue is disabled
  }
  
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Utility revenue is required when utility revenue is enabled' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Utility revenue must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Utility revenue cannot be negative' };
  }
  
  if (numValue > 1000000) {
    return { isValid: false, message: 'Utility revenue cannot exceed $1,000,000' };
  }
  
  return { isValid: true };
}
