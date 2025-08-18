import { Calculator } from '../../../types/calculator';
import { calculateHOAFee, generateHOAFeeAnalysis } from './formulas';
import { validateHOAFeeInputs } from './validation';

export const HOAFeeCalculator: Calculator = {
  id: 'hoa-fee-calculator',
  name: 'HOA Fee Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate HOA fees, assessments, and total monthly housing costs including maintenance, amenities, and special assessments.',
  inputs: [
    { id: 'monthlyHOAFee', name: 'Monthly HOA Fee', type: 'number', unit: 'USD', required: true, description: 'Base monthly HOA fee', placeholder: '300', min: 0, max: 5000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of property', options: ['condo', 'townhouse', 'single-family', 'co-op', 'pud'] },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', unit: 'sqft', required: false, description: 'Property square footage', placeholder: '1500', min: 100, max: 10000 },
    { id: 'bedrooms', name: 'Bedrooms', type: 'number', required: false, description: 'Number of bedrooms', placeholder: '3', min: 0, max: 10 },
    { id: 'bathrooms', name: 'Bathrooms', type: 'number', required: false, description: 'Number of bathrooms', placeholder: '2', min: 0, max: 10 },
    { id: 'parkingSpaces', name: 'Parking Spaces', type: 'number', required: false, description: 'Number of parking spaces included', placeholder: '2', min: 0, max: 10 },
    { id: 'amenities', name: 'Amenities', type: 'multiselect', required: false, description: 'Available amenities', options: ['pool', 'gym', 'spa', 'tennis-court', 'basketball-court', 'playground', 'clubhouse', 'concierge', 'security', 'elevator', 'parking-garage', 'storage-unit', 'rooftop-deck', 'garden', 'bbq-area', 'dog-park', 'bike-storage', 'package-reception', 'valet-parking', 'shuttle-service'] },
    { id: 'utilitiesIncluded', name: 'Utilities Included', type: 'multiselect', required: false, description: 'Utilities covered by HOA', options: ['water', 'sewer', 'trash', 'electricity', 'gas', 'internet', 'cable', 'heat', 'ac', 'none'] },
    { id: 'maintenanceIncluded', name: 'Maintenance Included', type: 'multiselect', required: false, description: 'Maintenance covered by HOA', options: ['exterior-painting', 'roof-repairs', 'landscaping', 'snow-removal', 'pest-control', 'window-cleaning', 'gutter-cleaning', 'exterior-lighting', 'sidewalk-repairs', 'none'] },
    { id: 'insuranceIncluded', name: 'Insurance Included', type: 'multiselect', required: false, description: 'Insurance covered by HOA', options: ['building-insurance', 'liability-insurance', 'flood-insurance', 'earthquake-insurance', 'none'] },
    { id: 'reserveFund', name: 'Reserve Fund', type: 'number', unit: 'USD', required: false, description: 'Monthly reserve fund contribution', placeholder: '50', min: 0, max: 1000 },
    { id: 'specialAssessment', name: 'Special Assessment', type: 'number', unit: 'USD', required: false, description: 'Monthly special assessment payment', placeholder: '0', min: 0, max: 5000 },
    { id: 'lateFees', name: 'Late Fees', type: 'number', unit: 'USD', required: false, description: 'Late payment fees', placeholder: '25', min: 0, max: 500 },
    { id: 'transferFees', name: 'Transfer Fees', type: 'number', unit: 'USD', required: false, description: 'Property transfer fees', placeholder: '500', min: 0, max: 10000 },
    { id: 'applicationFees', name: 'Application Fees', type: 'number', unit: 'USD', required: false, description: 'Rental application fees', placeholder: '200', min: 0, max: 2000 },
    { id: 'petFees', name: 'Pet Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly pet fees', placeholder: '25', min: 0, max: 500 },
    { id: 'guestParkingFees', name: 'Guest Parking Fees', type: 'number', unit: 'USD', required: false, description: 'Guest parking fees per day', placeholder: '5', min: 0, max: 100 },
    { id: 'rentalRestrictions', name: 'Rental Restrictions', type: 'select', required: false, description: 'Rental restrictions', options: ['none', 'minimum-lease', 'rental-cap', 'owner-occupancy-required', 'no-rentals'] },
    { id: 'rentalCap', name: 'Rental Cap', type: 'number', required: false, description: 'Percentage of units that can be rented', placeholder: '25', min: 0, max: 100 },
    { id: 'minimumLease', name: 'Minimum Lease', type: 'number', required: false, description: 'Minimum lease term in months', placeholder: '12', min: 1, max: 60 },
    { id: 'hoaAge', name: 'HOA Age', type: 'number', required: false, description: 'Age of HOA in years', placeholder: '10', min: 0, max: 100 },
    { id: 'totalUnits', name: 'Total Units', type: 'number', required: false, description: 'Total number of units in community', placeholder: '100', min: 1, max: 10000 },
    { id: 'occupancyRate', name: 'Occupancy Rate', type: 'number', required: false, description: 'Current occupancy rate percentage', placeholder: '95', min: 0, max: 100 },
    { id: 'annualBudget', name: 'Annual Budget', type: 'number', unit: 'USD', required: false, description: 'Annual HOA budget', placeholder: '500000', min: 0, max: 10000000 },
    { id: 'reserveFundBalance', name: 'Reserve Fund Balance', type: 'number', unit: 'USD', required: false, description: 'Current reserve fund balance', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'debtObligations', name: 'Debt Obligations', type: 'number', unit: 'USD', required: false, description: 'Outstanding debt obligations', placeholder: '0', min: 0, max: 10000000 },
    { id: 'pendingLitigation', name: 'Pending Litigation', type: 'select', required: false, description: 'Pending litigation status', options: ['none', 'minor', 'moderate', 'major'] },
    { id: 'managementCompany', name: 'Management Company', type: 'select', required: false, description: 'Professional management', options: ['self-managed', 'professional-management', 'hybrid'] },
    { id: 'managementFees', name: 'Management Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly management fees', placeholder: '1000', min: 0, max: 10000 },
    { id: 'legalFees', name: 'Legal Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly legal fees', placeholder: '500', min: 0, max: 5000 },
    { id: 'accountingFees', name: 'Accounting Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly accounting fees', placeholder: '300', min: 0, max: 3000 },
    { id: 'insuranceFees', name: 'Insurance Fees', type: 'number', unit: 'USD', required: false, description: 'Monthly insurance fees', placeholder: '2000', min: 0, max: 20000 },
    { id: 'utilityCosts', name: 'Utility Costs', type: 'number', unit: 'USD', required: false, description: 'Monthly utility costs', placeholder: '5000', min: 0, max: 100000 },
    { id: 'maintenanceCosts', name: 'Maintenance Costs', type: 'number', unit: 'USD', required: false, description: 'Monthly maintenance costs', placeholder: '3000', min: 0, max: 100000 },
    { id: 'landscapingCosts', name: 'Landscaping Costs', type: 'number', unit: 'USD', required: false, description: 'Monthly landscaping costs', placeholder: '1500', min: 0, max: 50000 },
    { id: 'securityCosts', name: 'Security Costs', type: 'number', unit: 'USD', required: false, description: 'Monthly security costs', placeholder: '2000', min: 0, max: 50000 },
    { id: 'poolMaintenance', name: 'Pool Maintenance', type: 'number', unit: 'USD', required: false, description: 'Monthly pool maintenance costs', placeholder: '800', min: 0, max: 20000 },
    { id: 'elevatorMaintenance', name: 'Elevator Maintenance', type: 'number', unit: 'USD', required: false, description: 'Monthly elevator maintenance costs', placeholder: '1200', min: 0, max: 30000 },
    { id: 'parkingMaintenance', name: 'Parking Maintenance', type: 'number', unit: 'USD', required: false, description: 'Monthly parking maintenance costs', placeholder: '600', min: 0, max: 15000 },
    { id: 'commonAreaUtilities', name: 'Common Area Utilities', type: 'number', unit: 'USD', required: false, description: 'Monthly common area utility costs', placeholder: '1000', min: 0, max: 20000 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', required: false, description: 'Annual inflation rate for fee increases', placeholder: '3', min: 0, max: 20 },
    { id: 'feeIncreaseHistory', name: 'Fee Increase History', type: 'select', required: false, description: 'Historical fee increase pattern', options: ['none', 'minimal', 'moderate', 'frequent', 'aggressive'] },
    { id: 'lastFeeIncrease', name: 'Last Fee Increase', type: 'number', required: false, description: 'Years since last fee increase', placeholder: '2', min: 0, max: 20 },
    { id: 'projectedIncrease', name: 'Projected Increase', type: 'number', required: false, description: 'Projected annual fee increase percentage', placeholder: '5', min: 0, max: 50 },
    { id: 'marketComparison', name: 'Market Comparison', type: 'select', required: false, description: 'HOA fees compared to market', options: ['below-market', 'market-rate', 'above-market', 'premium'] },
    { id: 'competitionLevel', name: 'Competition Level', type: 'select', required: false, description: 'Competition in the area', options: ['low', 'medium', 'high', 'very-high'] },
    { id: 'locationQuality', name: 'Location Quality', type: 'select', required: false, description: 'Quality of location', options: ['poor', 'fair', 'good', 'excellent', 'premium'] },
    { id: 'schoolDistrict', name: 'School District', type: 'select', required: false, description: 'School district quality', options: ['poor', 'fair', 'good', 'excellent'] },
    { id: 'crimeRate', name: 'Crime Rate', type: 'select', required: false, description: 'Area crime rate', options: ['high', 'medium', 'low', 'very-low'] },
    { id: 'publicTransportation', name: 'Public Transportation', type: 'select', required: false, description: 'Public transportation access', options: ['none', 'limited', 'good', 'excellent'] },
    { id: 'shoppingAccess', name: 'Shopping Access', type: 'select', required: false, description: 'Shopping access', options: ['none', 'limited', 'good', 'excellent'] },
    { id: 'entertainmentAccess', name: 'Entertainment Access', type: 'select', required: false, description: 'Entertainment access', options: ['none', 'limited', 'good', 'excellent'] },
    { id: 'medicalAccess', name: 'Medical Access', type: 'select', required: false, description: 'Medical facility access', options: ['none', 'limited', 'good', 'excellent'] },
    { id: 'employmentAccess', name: 'Employment Access', type: 'select', required: false, description: 'Employment center access', options: ['none', 'limited', 'good', 'excellent'] }
  ],
  outputs: [
    { id: 'totalMonthlyFee', name: 'Total Monthly Fee', type: 'number', unit: 'USD', description: 'Total monthly HOA fee including all components' },
    { id: 'annualHOACost', name: 'Annual HOA Cost', type: 'number', unit: 'USD', description: 'Total annual HOA costs' },
    { id: 'costPerSquareFoot', name: 'Cost per Square Foot', type: 'number', unit: 'USD/sqft', description: 'Monthly HOA cost per square foot' },
    { id: 'costPerBedroom', name: 'Cost per Bedroom', type: 'number', unit: 'USD/bedroom', description: 'Monthly HOA cost per bedroom' },
    { id: 'amenityValue', name: 'Amenity Value', type: 'number', unit: 'USD', description: 'Estimated monthly value of included amenities' },
    { id: 'utilitySavings', name: 'Utility Savings', type: 'number', unit: 'USD', description: 'Monthly savings from included utilities' },
    { id: 'maintenanceSavings', name: 'Maintenance Savings', type: 'number', unit: 'USD', description: 'Monthly savings from included maintenance' },
    { id: 'insuranceSavings', name: 'Insurance Savings', type: 'number', unit: 'USD', description: 'Monthly savings from included insurance' },
    { id: 'totalSavings', name: 'Total Savings', type: 'number', unit: 'USD', description: 'Total monthly savings from HOA services' },
    { id: 'netHOACost', name: 'Net HOA Cost', type: 'number', unit: 'USD', description: 'Net monthly HOA cost after savings' },
    { id: 'reserveFundHealth', name: 'Reserve Fund Health', type: 'string', description: 'Assessment of reserve fund health' },
    { id: 'financialHealth', name: 'Financial Health', type: 'string', description: 'Overall HOA financial health' },
    { id: 'feeCompetitiveness', name: 'Fee Competitiveness', type: 'string', description: 'How competitive the fees are' },
    { id: 'valueScore', name: 'Value Score', type: 'number', description: 'Overall value score (0-100)' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Risk assessment score (0-100)' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Overall recommendation' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'string', description: 'Key financial and operational metrics' },
    { id: 'costBreakdown', name: 'Cost Breakdown', type: 'string', description: 'Detailed cost breakdown' },
    { id: 'savingsBreakdown', name: 'Savings Breakdown', type: 'string', description: 'Detailed savings breakdown' },
    { id: 'comparisonTable', name: 'Comparison Table', type: 'string', description: 'Comparison with market rates' },
    { id: 'projectedCosts', name: 'Projected Costs', type: 'string', description: '5-year cost projections' },
    { id: 'hoaFeeAnalysis', name: 'HOA Fee Analysis', type: 'string', description: 'Comprehensive HOA fee analysis' }
  ],
  calculate: (inputs) => {
    return calculateHOAFee(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHOAFeeAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Monthly Fee',
      formula: 'Total Monthly Fee = Base HOA Fee + Reserve Fund + Special Assessment + Pet Fees',
      description: 'Calculates the total monthly HOA fee including all components'
    },
    {
      name: 'Cost per Square Foot',
      formula: 'Cost per Square Foot = Total Monthly Fee / Square Footage',
      description: 'Calculates the monthly HOA cost per square foot'
    },
    {
      name: 'Cost per Bedroom',
      formula: 'Cost per Bedroom = Total Monthly Fee / Number of Bedrooms',
      description: 'Calculates the monthly HOA cost per bedroom'
    },
    {
      name: 'Amenity Value',
      formula: 'Amenity Value = Sum of Individual Amenity Values',
      description: 'Calculates the estimated monthly value of included amenities'
    },
    {
      name: 'Utility Savings',
      formula: 'Utility Savings = Sum of Included Utility Costs',
      description: 'Calculates monthly savings from included utilities'
    },
    {
      name: 'Maintenance Savings',
      formula: 'Maintenance Savings = Sum of Included Maintenance Costs',
      description: 'Calculates monthly savings from included maintenance services'
    },
    {
      name: 'Insurance Savings',
      formula: 'Insurance Savings = Sum of Included Insurance Costs',
      description: 'Calculates monthly savings from included insurance coverage'
    },
    {
      name: 'Net HOA Cost',
      formula: 'Net HOA Cost = Total Monthly Fee - Total Savings',
      description: 'Calculates the net monthly HOA cost after accounting for savings'
    },
    {
      name: 'Reserve Fund Health',
      formula: 'Reserve Fund Health = (Reserve Fund Balance / Annual Budget) * 100',
      description: 'Assesses the health of the reserve fund as a percentage of annual budget'
    },
    {
      name: 'Value Score',
      formula: 'Value Score = (Amenity Value + Utility Savings + Maintenance Savings + Insurance Savings) / Total Monthly Fee * 100',
      description: 'Calculates overall value score based on benefits received'
    },
    {
      name: 'Risk Score',
      formula: 'Risk Score = Base Risk + Financial Risk + Litigation Risk + Management Risk',
      description: 'Calculates risk assessment score based on various factors'
    }
  ],
  examples: [
    {
      name: 'Standard Condo HOA',
      inputs: {
        monthlyHOAFee: 350,
        propertyType: 'condo',
        squareFootage: 1200,
        bedrooms: 2,
        bathrooms: 2,
        parkingSpaces: 1,
        amenities: ['pool', 'gym', 'concierge'],
        utilitiesIncluded: ['water', 'sewer', 'trash'],
        maintenanceIncluded: ['exterior-painting', 'landscaping'],
        insuranceIncluded: ['building-insurance'],
        reserveFund: 75,
        specialAssessment: 0,
        petFees: 25,
        marketComparison: 'market-rate',
        locationQuality: 'good',
        schoolDistrict: 'good',
        crimeRate: 'low'
      },
      description: 'Standard condo with typical amenities and services'
    },
    {
      name: 'Luxury High-Rise HOA',
      inputs: {
        monthlyHOAFee: 800,
        propertyType: 'condo',
        squareFootage: 2000,
        bedrooms: 3,
        bathrooms: 2.5,
        parkingSpaces: 2,
        amenities: ['pool', 'spa', 'gym', 'concierge', 'valet-parking', 'rooftop-deck'],
        utilitiesIncluded: ['water', 'sewer', 'trash', 'electricity', 'internet'],
        maintenanceIncluded: ['exterior-painting', 'landscaping', 'window-cleaning', 'exterior-lighting'],
        insuranceIncluded: ['building-insurance', 'liability-insurance'],
        reserveFund: 150,
        specialAssessment: 0,
        petFees: 50,
        marketComparison: 'premium',
        locationQuality: 'excellent',
        schoolDistrict: 'excellent',
        crimeRate: 'very-low'
      },
      description: 'Luxury high-rise with premium amenities and services'
    },
    {
      name: 'Townhouse HOA',
      inputs: {
        monthlyHOAFee: 250,
        propertyType: 'townhouse',
        squareFootage: 1800,
        bedrooms: 3,
        bathrooms: 2.5,
        parkingSpaces: 2,
        amenities: ['pool', 'playground', 'bbq-area'],
        utilitiesIncluded: ['water', 'sewer', 'trash'],
        maintenanceIncluded: ['exterior-painting', 'roof-repairs', 'landscaping'],
        insuranceIncluded: ['building-insurance'],
        reserveFund: 50,
        specialAssessment: 0,
        petFees: 0,
        marketComparison: 'below-market',
        locationQuality: 'good',
        schoolDistrict: 'good',
        crimeRate: 'low'
      },
      description: 'Townhouse community with family-friendly amenities'
    }
  ]
};
