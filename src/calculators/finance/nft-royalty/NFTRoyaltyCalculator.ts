import { NFTRoyaltyInputs, NFTRoyaltyOutputs } from './types';
import { calculateNFTRoyaltyProfitability } from './formulas';
import { nftRoyaltyValidationRules } from './validation';
import { validateNFTRoyaltyInputs } from './validation';
import { quickValidateCollectionSize, quickValidateRoyaltyPercentage, quickValidateMintPrice } from './quickValidation';

export const nftRoyaltyCalculator = {
  name: 'NFT Royalty & Revenue Calculator',
  category: 'Finance',
  description: 'Calculate NFT royalty earnings, compare marketplace fees, and project long-term revenue from digital art collections',
  icon: '🎨',
  
  inputs: {
    // Collection Configuration
    collectionSize: {
      type: 'number',
      label: 'Collection Size',
      unit: 'NFTs',
      description: 'Total number of NFTs in the collection',
      placeholder: '10000',
      required: true,
      min: 1,
      max: 1000000
    },
    mintPrice: {
      type: 'number',
      label: 'Mint Price',
      unit: 'USD',
      description: 'Initial mint price per NFT',
      placeholder: '0.1',
      required: true,
      min: 0.001,
      max: 10000
    },
    royaltyPercentage: {
      type: 'number',
      label: 'Royalty Percentage',
      unit: '%',
      description: 'Royalty percentage on secondary sales',
      placeholder: '5',
      required: true,
      min: 0.1,
      max: 50
    },
    
    // Market Data
    averageResalePrice: {
      type: 'number',
      label: 'Average Resale Price',
      unit: 'USD',
      description: 'Average price of secondary sales',
      placeholder: '0.5',
      required: true,
      min: 0.001,
      max: 100000
    },
    monthlyTrades: {
      type: 'number',
      label: 'Monthly Trades',
      unit: 'trades',
      description: 'Average number of trades per month',
      placeholder: '100',
      required: true,
      min: 0,
      max: 100000
    },
    floorPrice: {
      type: 'number',
      label: 'Floor Price',
      unit: 'USD',
      description: 'Current floor price of the collection',
      placeholder: '0.3',
      required: false,
      min: 0.001,
      max: 100000
    },
    
    // Marketplace Configuration
    marketplace: {
      type: 'select',
      label: 'Primary Marketplace',
      description: 'Main marketplace for trading',
      options: [
        { value: 'opensea', label: 'OpenSea', fee: 2.5 },
        { value: 'blur', label: 'Blur', fee: 0.5 },
        { value: 'looksrare', label: 'LooksRare', fee: 2.0 },
        { value: 'x2y2', label: 'X2Y2', fee: 0.5 },
        { value: 'foundation', label: 'Foundation', fee: 5.0 },
        { value: 'superrare', label: 'SuperRare', fee: 3.0 },
        { value: 'rarible', label: 'Rarible', fee: 2.5 },
        { value: 'magic-eden', label: 'Magic Eden', fee: 2.0 },
        { value: 'custom', label: 'Custom', fee: 2.5 }
      ],
      required: true
    },
    customMarketplaceFee: {
      type: 'number',
      label: 'Custom Marketplace Fee',
      unit: '%',
      description: 'Fee for custom marketplace',
      placeholder: '2.5',
      required: false,
      min: 0,
      max: 20,
      default: 2.5
    },
    
    // Collection Type & Market Factors
    collectionType: {
      type: 'select',
      label: 'Collection Type',
      description: 'Type of NFT collection',
      options: [
        { value: 'pfp', label: 'PFP/Avatar', multiplier: 1.0 },
        { value: 'art', label: '1/1 Art', multiplier: 1.5 },
        { value: 'gaming', label: 'Gaming Assets', multiplier: 1.2 },
        { value: 'utility', label: 'Utility NFTs', multiplier: 0.8 },
        { value: 'music', label: 'Music NFTs', multiplier: 1.3 },
        { value: 'photography', label: 'Photography', multiplier: 1.1 },
        { value: 'generative', label: 'Generative Art', multiplier: 1.0 },
        { value: 'metaverse', label: 'Metaverse Assets', multiplier: 1.4 },
        { value: 'collectibles', label: 'Collectibles', multiplier: 1.1 },
        { value: 'custom', label: 'Custom', multiplier: 1.0 }
      ],
      required: true
    },
    priceAppreciation: {
      type: 'number',
      label: 'Price Appreciation',
      unit: '%',
      description: 'Expected annual price appreciation',
      placeholder: '20',
      required: false,
      min: -50,
      max: 500,
      default: 20
    },
    
    // Advanced Options
    tradingVolumeGrowth: {
      type: 'number',
      label: 'Trading Volume Growth',
      unit: '%',
      description: 'Expected annual growth in trading volume',
      placeholder: '30',
      required: false,
      min: -50,
      max: 300,
      default: 30
    },
    activePeriod: {
      type: 'number',
      label: 'Active Period',
      unit: 'years',
      description: 'Expected active trading period',
      placeholder: '5',
      required: false,
      min: 1,
      max: 20,
      default: 5
    },
    
    // Revenue Streams
    includePrimarySales: {
      type: 'boolean',
      label: 'Include Primary Sales',
      description: 'Include revenue from initial mint sales',
      required: false,
      default: true
    },
    includeSecondarySales: {
      type: 'boolean',
      label: 'Include Secondary Sales',
      description: 'Include revenue from secondary market sales',
      required: false,
      default: true
    },
    includeUtilityRevenue: {
      type: 'boolean',
      label: 'Include Utility Revenue',
      description: 'Include revenue from utility features',
      required: false,
      default: false
    },
    utilityRevenue: {
      type: 'number',
      label: 'Monthly Utility Revenue',
      unit: 'USD',
      description: 'Additional monthly revenue from utility features',
      placeholder: '1000',
      required: false,
      min: 0,
      max: 1000000,
      default: 0
    }
  },
  
  outputs: {
    // Basic Royalty Metrics
    royaltyPerSale: {
      type: 'number',
      label: 'Royalty Per Sale',
      unit: 'USD',
      description: 'Average royalty earned per secondary sale'
    },
    monthlyRoyalties: {
      type: 'number',
      label: 'Monthly Royalties',
      unit: 'USD',
      description: 'Total monthly royalty earnings'
    },
    yearlyRoyalties: {
      type: 'number',
      label: 'Yearly Royalties',
      unit: 'USD',
      description: 'Total annual royalty earnings'
    },
    
    // Long-term Projections
    totalLifetimeRoyalties: {
      type: 'number',
      label: 'Lifetime Royalties',
      unit: 'USD',
      description: 'Projected total royalties over active period'
    },
    breakEvenMonths: {
      type: 'number',
      label: 'Break-Even Months',
      unit: 'months',
      description: 'Time to break even on development costs'
    },
    
    // Marketplace Analysis
    marketplaceComparison: {
      type: 'object',
      label: 'Marketplace Comparison',
      description: 'Royalty earnings across different marketplaces'
    },
    optimalMarketplace: {
      type: 'string',
      label: 'Optimal Marketplace',
      description: 'Best marketplace for maximizing royalties'
    },
    
    // Growth Scenarios
    conservativeGrowth: {
      type: 'number',
      label: 'Conservative Growth',
      unit: 'USD',
      description: 'Conservative annual revenue projection'
    },
    moderateGrowth: {
      type: 'number',
      label: 'Moderate Growth',
      unit: 'USD',
      description: 'Moderate annual revenue projection'
    },
    optimisticGrowth: {
      type: 'number',
      label: 'Optimistic Growth',
      unit: 'USD',
      description: 'Optimistic annual revenue projection'
    },
    
    // Revenue Breakdown
    primarySales: {
      type: 'number',
      label: 'Primary Sales',
      unit: 'USD',
      description: 'Revenue from initial mint sales'
    },
    secondarySales: {
      type: 'number',
      label: 'Secondary Sales',
      unit: 'USD',
      description: 'Revenue from secondary market sales'
    },
    totalRevenue: {
      type: 'number',
      label: 'Total Revenue',
      unit: 'USD',
      description: 'Total projected revenue'
    },
    
    // Performance Metrics
    roi: {
      type: 'number',
      label: 'ROI',
      unit: '%',
      description: 'Return on investment percentage'
    },
    efficiencyRating: {
      type: 'string',
      label: 'Efficiency Rating',
      description: 'Overall efficiency assessment'
    },
    riskLevel: {
      type: 'string',
      label: 'Risk Level',
      description: 'Investment risk assessment'
    },
    report: {
      type: 'string',
      label: 'Detailed Report',
      description: 'Comprehensive NFT royalty analysis'
    }
  },
  
  calculate: calculateNFTRoyaltyProfitability,
  validate: validateNFTRoyaltyInputs,
  validationRules: nftRoyaltyValidationRules,
  quickValidation: {
    collectionSize: quickValidateCollectionSize,
    royaltyPercentage: quickValidateRoyaltyPercentage,
    mintPrice: quickValidateMintPrice
  }
};
