import { Calculator } from '../../../types/calculator';
import { hobbiesCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const hobbiesCalculator: Calculator = {
  id: 'hobbies-calculator',
  title: 'Hobbies & Collectibles Calculator',
  category: 'lifestyle',
  subcategory: 'Hobbies & Collectibles',
  description: 'Comprehensive calculator for hobby costs, collectible valuations, gaming statistics, craft project planning, and investment analysis for collectibles with market trend insights.',
  
  usageInstructions: [
    'Select the type of hobby calculation (collectibles, gaming, crafts, or investment)',
    'Enter relevant details about your items, projects, or activities',
    'For collectible valuations, provide condition and rarity information',
    'For project planning, specify materials and time requirements',
    'Review analysis with market insights and recommendations'
  ],

  inputs: [
    {
      id: 'calculationType',
      label: 'Calculation Type',
      type: 'select',
      required: true,
      options: [
        { value: 'collectible_value', label: 'Collectible Valuation' },
        { value: 'hobby_cost', label: 'Hobby Cost Analysis' },
        { value: 'gaming_stats', label: 'Gaming Statistics' },
        { value: 'craft_project', label: 'Craft Project Planning' },
        { value: 'collection_insurance', label: 'Collection Insurance' },
        { value: 'investment_analysis', label: 'Collectible Investment Analysis' }
      ],
      tooltip: 'Choose the type of hobby calculation'
    },
    {
      id: 'collectibleType',
      label: 'Collectible Type',
      type: 'select',
      required: false,
      options: [
        { value: 'trading_cards', label: 'Trading Cards (Sports/Gaming)' },
        { value: 'coins', label: 'Coins & Currency' },
        { value: 'stamps', label: 'Stamps' },
        { value: 'comics', label: 'Comic Books' },
        { value: 'toys', label: 'Vintage Toys' },
        { value: 'art', label: 'Art & Prints' },
        { value: 'books', label: 'Rare Books' },
        { value: 'watches', label: 'Watches' },
        { value: 'jewelry', label: 'Jewelry' },
        { value: 'other', label: 'Other Collectibles' }
      ],
      tooltip: 'Type of collectible item'
    },
    {
      id: 'itemCondition',
      label: 'Item Condition',
      type: 'select',
      required: false,
      options: [
        { value: 'mint', label: 'Mint/Perfect (10)' },
        { value: 'near_mint', label: 'Near Mint (8-9)' },
        { value: 'excellent', label: 'Excellent (6-7)' },
        { value: 'very_good', label: 'Very Good (4-5)' },
        { value: 'good', label: 'Good (2-3)' },
        { value: 'poor', label: 'Poor (1)' }
      ],
      tooltip: 'Condition of the collectible item'
    },
    {
      id: 'originalPrice',
      label: 'Original Purchase Price ($)',
      type: 'currency',
      required: false,
      placeholder: '50.00',
      tooltip: 'What you originally paid for the item'
    },
    {
      id: 'currentMarketValue',
      label: 'Current Market Value ($)',
      type: 'currency',
      required: false,
      placeholder: '150.00',
      tooltip: 'Current estimated market value'
    },
    {
      id: 'rarity',
      label: 'Rarity Level',
      type: 'select',
      required: false,
      options: [
        { value: 'common', label: 'Common' },
        { value: 'uncommon', label: 'Uncommon' },
        { value: 'rare', label: 'Rare' },
        { value: 'very_rare', label: 'Very Rare' },
        { value: 'ultra_rare', label: 'Ultra Rare' },
        { value: 'legendary', label: 'Legendary/Unique' }
      ],
      tooltip: 'Rarity level of the item'
    },
    {
      id: 'yearAcquired',
      label: 'Year Acquired',
      type: 'number',
      required: false,
      min: 1900,
      max: 2024,
      placeholder: '2020',
      tooltip: 'Year you acquired the item'
    },
    {
      id: 'monthlyHobbyCost',
      label: 'Monthly Hobby Spending ($)',
      type: 'currency',
      required: false,
      placeholder: '200.00',
      tooltip: 'Average monthly spending on this hobby'
    },
    {
      id: 'hoursPerWeek',
      label: 'Hours Per Week',
      type: 'number',
      required: false,
      min: 0,
      max: 168,
      placeholder: '10',
      tooltip: 'Hours spent on hobby per week'
    },
    {
      id: 'projectMaterialCost',
      label: 'Project Material Cost ($)',
      type: 'currency',
      required: false,
      placeholder: '75.00',
      tooltip: 'Cost of materials for craft project'
    },
    {
      id: 'projectTimeHours',
      label: 'Project Time (hours)',
      type: 'number',
      required: false,
      min: 0,
      placeholder: '20',
      tooltip: 'Estimated time to complete project'
    },
    {
      id: 'skillLevel',
      label: 'Skill Level',
      type: 'select',
      required: false,
      options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'expert', label: 'Expert' }
      ],
      tooltip: 'Your skill level in this hobby'
    },
    {
      id: 'collectionSize',
      label: 'Collection Size (items)',
      type: 'number',
      required: false,
      min: 1,
      placeholder: '150',
      tooltip: 'Number of items in your collection'
    },
    {
      id: 'averageItemValue',
      label: 'Average Item Value ($)',
      type: 'currency',
      required: false,
      placeholder: '25.00',
      tooltip: 'Average value per item in collection'
    }
  ],

  outputs: [
    {
      id: 'estimatedValue',
      label: 'Estimated Value',
      type: 'currency',
      explanation: 'Current estimated value of the item or collection'
    },
    {
      id: 'appreciationRate',
      label: 'Appreciation Rate',
      type: 'percentage',
      explanation: 'Annual appreciation rate of the collectible'
    },
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Total amount invested in the hobby'
    },
    {
      id: 'costPerHour',
      label: 'Cost Per Hour',
      type: 'currency',
      explanation: 'Cost per hour of hobby enjoyment'
    },
    {
      id: 'projectCostBreakdown',
      label: 'Project Cost Breakdown',
      type: 'text',
      explanation: 'Detailed breakdown of project costs'
    },
    {
      id: 'insuranceValue',
      label: 'Insurance Value',
      type: 'currency',
      explanation: 'Recommended insurance coverage amount'
    },
    {
      id: 'marketTrend',
      label: 'Market Trend',
      type: 'text',
      explanation: 'Current market trend for this collectible type'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Expert recommendations and tips'
    },
    {
      id: 'roi',
      label: 'Return on Investment',
      type: 'percentage',
      explanation: 'Return on investment percentage'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-even Point',
      type: 'text',
      explanation: 'When investment will break even'
    }
  ],

  formulas: [hobbiesCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('calculationType', 'Calculation type is required'),
    
    ValidationRuleFactory.businessRule(
      'originalPrice',
      (price, inputs) => {
        const valueCalcs = ['collectible_value', 'investment_analysis'];
        if (valueCalcs.includes(inputs?.calculationType) && !price) {
          return false;
        }
        return true;
      },
      'Original price is required for valuation calculations'
    ),
    
    ValidationRuleFactory.businessRule(
      'monthlyHobbyCost',
      (cost, inputs) => {
        if (inputs?.calculationType === 'hobby_cost' && !cost) {
          return false;
        }
        return true;
      },
      'Monthly hobby cost is required for cost analysis'
    ),
    
    ValidationRuleFactory.businessRule(
      'projectMaterialCost',
      (cost, inputs) => {
        if (inputs?.calculationType === 'craft_project' && !cost) {
          return false;
        }
        return true;
      },
      'Project material cost is required for craft project planning'
    ),
    
    ValidationRuleFactory.businessRule(
      'yearAcquired',
      (year) => {
        if (year !== undefined) {
          const currentYear = new Date().getFullYear();
          return year >= 1900 && year <= currentYear;
        }
        return true;
      },
      'Year acquired must be between 1900 and current year'
    )
  ],

  examples: [
    {
      title: 'Trading Card Valuation',
      description: 'Value a rare trading card in mint condition',
      inputs: {
        calculationType: 'collectible_value',
        collectibleType: 'trading_cards',
        itemCondition: 'mint',
        originalPrice: 5.00,
        currentMarketValue: 250.00,
        rarity: 'very_rare',
        yearAcquired: 2018
      },
      expectedOutputs: {
        estimatedValue: 250.00,
        appreciationRate: 15.2,
        roi: 4900
      }
    },
    {
      title: 'Hobby Cost Analysis',
      description: 'Analyze monthly costs for a photography hobby',
      inputs: {
        calculationType: 'hobby_cost',
        monthlyHobbyCost: 300.00,
        hoursPerWeek: 15,
        skillLevel: 'intermediate'
      },
      expectedOutputs: {
        costPerHour: 5.00,
        totalInvestment: 3600
      }
    }
  ]
};