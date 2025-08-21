import { Calculator } from '../../../types/Calculator';
import { calculateTenantImprovementAllowance } from './formulas';
import { generateTenantImprovementAllowanceAnalysis } from './formulas';

export interface TenantImprovementAllowanceInputs {
  // Lease Details
  leaseTerm: number;
  rentableSquareFootage: number;
  usableSquareFootage: number;
  baseRent: number;
  baseRentPerSqFt: number;
  annualRentEscalation: number;
  
  // TI Allowance Details
  tiAllowancePerSqFt: number;
  totalTiAllowance: number;
  tiAllowanceType: 'per-sq-ft' | 'lump-sum' | 'percentage-of-rent';
  tiAllowancePercentage: number;
  
  // Construction Costs
  constructionCostPerSqFt: number;
  totalConstructionCost: number;
  softCosts: number;
  hardCosts: number;
  permitFees: number;
  architecturalFees: number;
  engineeringFees: number;
  projectManagementFees: number;
  
  // Improvement Categories
  demolitionCosts: number;
  structuralModifications: number;
  electricalWork: number;
  plumbingWork: number;
  hvacWork: number;
  flooringCosts: number;
  wallFinishes: number;
  ceilingWork: number;
  lightingCosts: number;
  millworkCosts: number;
  paintingCosts: number;
  fixturesCosts: number;
  technologyInfrastructure: number;
  securitySystems: number;
  signageCosts: number;
  
  // Timeline and Phasing
  constructionDuration: number;
  rentCommencementDate: Date;
  constructionStartDate: Date;
  constructionEndDate: Date;
  rentAbatementPeriod: number;
  
  // Market Factors
  marketTiAllowance: number;
  constructionCostIndex: number;
  laborCostMultiplier: number;
  materialCostMultiplier: number;
  
  // Tenant Profile
  tenantType: 'office' | 'retail' | 'industrial' | 'medical' | 'restaurant' | 'other';
  tenantCreditRating: 'excellent' | 'good' | 'fair' | 'poor';
  tenantFinancialStrength: number;
  tenantIndustry: string;
  
  // Property Details
  propertyType: 'office-building' | 'shopping-center' | 'industrial-park' | 'medical-office' | 'mixed-use';
  propertyAge: number;
  propertyClass: 'class-a' | 'class-b' | 'class-c';
  propertyLocation: 'urban' | 'suburban' | 'rural';
  
  // Lease Structure
  leaseType: 'gross' | 'net' | 'modified-gross' | 'triple-net';
  operatingExpensePassThrough: boolean;
  realEstateTaxPassThrough: boolean;
  insurancePassThrough: boolean;
  
  // Additional Factors
  buildoutSpecifications: 'vanilla-shell' | 'warm-shell' | 'cold-shell' | 'turnkey';
  sustainabilityRequirements: 'basic' | 'leed-silver' | 'leed-gold' | 'leed-platinum';
  accessibilityCompliance: boolean;
  energyEfficiencyStandards: 'standard' | 'energy-star' | 'net-zero';
}

export interface TenantImprovementAllowanceOutputs {
  // Financial Analysis
  totalTiAllowance: number;
  totalConstructionCost: number;
  tenantContribution: number;
  landlordContribution: number;
  costOverrun: number;
  costSavings: number;
  
  // Cost Breakdown
  hardCostsBreakdown: number;
  softCostsBreakdown: number;
  totalProjectCost: number;
  costPerSqFt: number;
  allowanceUtilizationRate: number;
  
  // Lease Impact
  effectiveRent: number;
  effectiveRentPerSqFt: number;
  rentImpact: number;
  totalLeaseValue: number;
  netPresentValue: number;
  
  // Timeline Analysis
  constructionTimeline: number;
  rentAbatementValue: number;
  earlyOccupancyValue: number;
  delayPenalties: number;
  
  // Market Comparison
  marketComparison: string;
  competitivePosition: 'above-market' | 'at-market' | 'below-market';
  marketTiAllowanceComparison: number;
  constructionCostComparison: number;
  
  // Risk Assessment
  riskScore: number;
  constructionRisk: number;
  financialRisk: number;
  marketRisk: number;
  timelineRisk: number;
  
  // Recommendations
  recommendation: string;
  negotiationStrategy: string;
  costOptimizationSuggestions: string[];
  riskMitigationStrategies: string[];
  alternativeApproaches: string[];
  
  // Detailed Breakdowns
  categoryBreakdown: {
    demolition: number;
    structural: number;
    electrical: number;
    plumbing: number;
    hvac: number;
    flooring: number;
    walls: number;
    ceilings: number;
    lighting: number;
    millwork: number;
    painting: number;
    fixtures: number;
    technology: number;
    security: number;
    signage: number;
  };
  
  // ROI Analysis
  tenantROI: number;
  landlordROI: number;
  paybackPeriod: number;
  internalRateOfReturn: number;
}

export const TenantImprovementAllowanceCalculator: Calculator = {
  id: 'tenant-improvement-allowance-calculator',
  name: 'Tenant Improvement (TI) Allowance Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate tenant improvement allowances, construction costs, lease impacts, and financial analysis for commercial real estate leases.',
  inputs: [
    {
      id: 'leaseTerm',
      name: 'Lease Term',
      type: 'number',
      required: true,
      unit: 'years',
      description: 'Length of the lease term in years',
      min: 1,
      max: 20,
      step: 1
    },
    {
      id: 'rentableSquareFootage',
      name: 'Rentable Square Footage',
      type: 'number',
      required: true,
      unit: 'sq ft',
      description: 'Total rentable square footage of the space',
      min: 100,
      max: 1000000,
      step: 100
    },
    {
      id: 'usableSquareFootage',
      name: 'Usable Square Footage',
      type: 'number',
      required: true,
      unit: 'sq ft',
      description: 'Actual usable square footage of the space',
      min: 100,
      max: 1000000,
      step: 100
    },
    {
      id: 'baseRent',
      name: 'Base Rent',
      type: 'number',
      required: true,
      unit: 'USD/year',
      description: 'Annual base rent amount',
      min: 1000,
      max: 10000000,
      step: 1000
    },
    {
      id: 'baseRentPerSqFt',
      name: 'Base Rent per Sq Ft',
      type: 'number',
      required: true,
      unit: 'USD/sq ft/year',
      description: 'Annual base rent per square foot',
      min: 1,
      max: 200,
      step: 1
    },
    {
      id: 'annualRentEscalation',
      name: 'Annual Rent Escalation',
      type: 'number',
      required: true,
      unit: '%',
      description: 'Annual rent escalation percentage',
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'tiAllowancePerSqFt',
      name: 'TI Allowance per Sq Ft',
      type: 'number',
      required: false,
      unit: 'USD/sq ft',
      description: 'TI allowance per square foot',
      min: 0,
      max: 200,
      step: 1
    },
    {
      id: 'totalTiAllowance',
      name: 'Total TI Allowance',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Total TI allowance amount',
      min: 0,
      max: 10000000,
      step: 1000
    },
    {
      id: 'tiAllowanceType',
      name: 'TI Allowance Type',
      type: 'select',
      required: true,
      options: [
        { value: 'per-sq-ft', label: 'Per Square Foot' },
        { value: 'lump-sum', label: 'Lump Sum' },
        { value: 'percentage-of-rent', label: 'Percentage of Rent' }
      ],
      description: 'Type of TI allowance structure'
    },
    {
      id: 'tiAllowancePercentage',
      name: 'TI Allowance Percentage',
      type: 'number',
      required: false,
      unit: '%',
      description: 'TI allowance as percentage of rent',
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'constructionCostPerSqFt',
      name: 'Construction Cost per Sq Ft',
      type: 'number',
      required: true,
      unit: 'USD/sq ft',
      description: 'Construction cost per square foot',
      min: 10,
      max: 500,
      step: 1
    },
    {
      id: 'totalConstructionCost',
      name: 'Total Construction Cost',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Total construction cost estimate',
      min: 0,
      max: 10000000,
      step: 1000
    },
    {
      id: 'softCosts',
      name: 'Soft Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Soft costs (design, permits, etc.)',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'hardCosts',
      name: 'Hard Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Hard costs (construction, materials)',
      min: 0,
      max: 10000000,
      step: 1000
    },
    {
      id: 'permitFees',
      name: 'Permit Fees',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Building permit and inspection fees',
      min: 0,
      max: 100000,
      step: 100
    },
    {
      id: 'architecturalFees',
      name: 'Architectural Fees',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Architectural design fees',
      min: 0,
      max: 500000,
      step: 1000
    },
    {
      id: 'engineeringFees',
      name: 'Engineering Fees',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Engineering design fees',
      min: 0,
      max: 500000,
      step: 1000
    },
    {
      id: 'projectManagementFees',
      name: 'Project Management Fees',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Project management and oversight fees',
      min: 0,
      max: 300000,
      step: 1000
    },
    {
      id: 'demolitionCosts',
      name: 'Demolition Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Demolition and removal costs',
      min: 0,
      max: 500000,
      step: 1000
    },
    {
      id: 'structuralModifications',
      name: 'Structural Modifications',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Structural modifications and reinforcements',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'electricalWork',
      name: 'Electrical Work',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Electrical system work and upgrades',
      min: 0,
      max: 500000,
      step: 1000
    },
    {
      id: 'plumbingWork',
      name: 'Plumbing Work',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Plumbing system work and upgrades',
      min: 0,
      max: 500000,
      step: 1000
    },
    {
      id: 'hvacWork',
      name: 'HVAC Work',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'HVAC system work and upgrades',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'flooringCosts',
      name: 'Flooring Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Flooring materials and installation',
      min: 0,
      max: 300000,
      step: 1000
    },
    {
      id: 'wallFinishes',
      name: 'Wall Finishes',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Wall finishes and treatments',
      min: 0,
      max: 200000,
      step: 1000
    },
    {
      id: 'ceilingWork',
      name: 'Ceiling Work',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Ceiling work and treatments',
      min: 0,
      max: 200000,
      step: 1000
    },
    {
      id: 'lightingCosts',
      name: 'Lighting Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Lighting fixtures and installation',
      min: 0,
      max: 200000,
      step: 1000
    },
    {
      id: 'millworkCosts',
      name: 'Millwork Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Custom millwork and cabinetry',
      min: 0,
      max: 300000,
      step: 1000
    },
    {
      id: 'paintingCosts',
      name: 'Painting Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Painting and finishing costs',
      min: 0,
      max: 100000,
      step: 1000
    },
    {
      id: 'fixturesCosts',
      name: 'Fixtures Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Fixtures, furniture, and equipment',
      min: 0,
      max: 500000,
      step: 1000
    },
    {
      id: 'technologyInfrastructure',
      name: 'Technology Infrastructure',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Technology infrastructure and systems',
      min: 0,
      max: 300000,
      step: 1000
    },
    {
      id: 'securitySystems',
      name: 'Security Systems',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Security systems and access control',
      min: 0,
      max: 200000,
      step: 1000
    },
    {
      id: 'signageCosts',
      name: 'Signage Costs',
      type: 'number',
      required: false,
      unit: 'USD',
      description: 'Signage and branding costs',
      min: 0,
      max: 100000,
      step: 1000
    },
    {
      id: 'constructionDuration',
      name: 'Construction Duration',
      type: 'number',
      required: true,
      unit: 'weeks',
      description: 'Expected construction duration in weeks',
      min: 1,
      max: 52,
      step: 1
    },
    {
      id: 'rentCommencementDate',
      name: 'Rent Commencement Date',
      type: 'date',
      required: true,
      description: 'Date when rent payments begin'
    },
    {
      id: 'constructionStartDate',
      name: 'Construction Start Date',
      type: 'date',
      required: true,
      description: 'Expected construction start date'
    },
    {
      id: 'constructionEndDate',
      name: 'Construction End Date',
      type: 'date',
      required: true,
      description: 'Expected construction completion date'
    },
    {
      id: 'rentAbatementPeriod',
      name: 'Rent Abatement Period',
      type: 'number',
      required: false,
      unit: 'months',
      description: 'Rent abatement period in months',
      min: 0,
      max: 12,
      step: 1
    },
    {
      id: 'marketTiAllowance',
      name: 'Market TI Allowance',
      type: 'number',
      required: false,
      unit: 'USD/sq ft',
      description: 'Market standard TI allowance per sq ft',
      min: 0,
      max: 200,
      step: 1
    },
    {
      id: 'constructionCostIndex',
      name: 'Construction Cost Index',
      type: 'number',
      required: false,
      description: 'Local construction cost index (base 100)',
      min: 50,
      max: 200,
      step: 1
    },
    {
      id: 'laborCostMultiplier',
      name: 'Labor Cost Multiplier',
      type: 'number',
      required: false,
      description: 'Local labor cost multiplier',
      min: 0.5,
      max: 2.0,
      step: 0.1
    },
    {
      id: 'materialCostMultiplier',
      name: 'Material Cost Multiplier',
      type: 'number',
      required: false,
      description: 'Local material cost multiplier',
      min: 0.5,
      max: 2.0,
      step: 0.1
    },
    {
      id: 'tenantType',
      name: 'Tenant Type',
      type: 'select',
      required: true,
      options: [
        { value: 'office', label: 'Office' },
        { value: 'retail', label: 'Retail' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'medical', label: 'Medical' },
        { value: 'restaurant', label: 'Restaurant' },
        { value: 'other', label: 'Other' }
      ],
      description: 'Type of tenant business'
    },
    {
      id: 'tenantCreditRating',
      name: 'Tenant Credit Rating',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      description: 'Tenant credit rating'
    },
    {
      id: 'tenantFinancialStrength',
      name: 'Tenant Financial Strength',
      type: 'number',
      required: false,
      description: 'Tenant financial strength score (1-100)',
      min: 1,
      max: 100,
      step: 1
    },
    {
      id: 'tenantIndustry',
      name: 'Tenant Industry',
      type: 'text',
      required: false,
      description: 'Tenant industry or business sector'
    },
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'office-building', label: 'Office Building' },
        { value: 'shopping-center', label: 'Shopping Center' },
        { value: 'industrial-park', label: 'Industrial Park' },
        { value: 'medical-office', label: 'Medical Office' },
        { value: 'mixed-use', label: 'Mixed Use' }
      ],
      description: 'Type of commercial property'
    },
    {
      id: 'propertyAge',
      name: 'Property Age',
      type: 'number',
      required: true,
      unit: 'years',
      description: 'Age of the property in years',
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'propertyClass',
      name: 'Property Class',
      type: 'select',
      required: true,
      options: [
        { value: 'class-a', label: 'Class A' },
        { value: 'class-b', label: 'Class B' },
        { value: 'class-c', label: 'Class C' }
      ],
      description: 'Property class rating'
    },
    {
      id: 'propertyLocation',
      name: 'Property Location',
      type: 'select',
      required: true,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' }
      ],
      description: 'Property location type'
    },
    {
      id: 'leaseType',
      name: 'Lease Type',
      type: 'select',
      required: true,
      options: [
        { value: 'gross', label: 'Gross' },
        { value: 'net', label: 'Net' },
        { value: 'modified-gross', label: 'Modified Gross' },
        { value: 'triple-net', label: 'Triple Net' }
      ],
      description: 'Type of lease structure'
    },
    {
      id: 'operatingExpensePassThrough',
      name: 'Operating Expense Pass Through',
      type: 'boolean',
      required: false,
      description: 'Whether operating expenses are passed through to tenant'
    },
    {
      id: 'realEstateTaxPassThrough',
      name: 'Real Estate Tax Pass Through',
      type: 'boolean',
      required: false,
      description: 'Whether real estate taxes are passed through to tenant'
    },
    {
      id: 'insurancePassThrough',
      name: 'Insurance Pass Through',
      type: 'boolean',
      required: false,
      description: 'Whether insurance costs are passed through to tenant'
    },
    {
      id: 'buildoutSpecifications',
      name: 'Buildout Specifications',
      type: 'select',
      required: true,
      options: [
        { value: 'vanilla-shell', label: 'Vanilla Shell' },
        { value: 'warm-shell', label: 'Warm Shell' },
        { value: 'cold-shell', label: 'Cold Shell' },
        { value: 'turnkey', label: 'Turnkey' }
      ],
      description: 'Level of buildout specifications'
    },
    {
      id: 'sustainabilityRequirements',
      name: 'Sustainability Requirements',
      type: 'select',
      required: true,
      options: [
        { value: 'basic', label: 'Basic' },
        { value: 'leed-silver', label: 'LEED Silver' },
        { value: 'leed-gold', label: 'LEED Gold' },
        { value: 'leed-platinum', label: 'LEED Platinum' }
      ],
      description: 'Sustainability certification requirements'
    },
    {
      id: 'accessibilityCompliance',
      name: 'Accessibility Compliance',
      type: 'boolean',
      required: false,
      description: 'Whether ADA compliance is required'
    },
    {
      id: 'energyEfficiencyStandards',
      name: 'Energy Efficiency Standards',
      type: 'select',
      required: true,
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'energy-star', label: 'Energy Star' },
        { value: 'net-zero', label: 'Net Zero' }
      ],
      description: 'Energy efficiency standards'
    }
  ],
  outputs: [
    {
      id: 'totalTiAllowance',
      name: 'Total TI Allowance',
      type: 'number',
      unit: 'USD',
      description: 'Total tenant improvement allowance'
    },
    {
      id: 'totalConstructionCost',
      name: 'Total Construction Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total construction cost estimate'
    },
    {
      id: 'tenantContribution',
      name: 'Tenant Contribution',
      type: 'number',
      unit: 'USD',
      description: 'Amount tenant must contribute beyond TI allowance'
    },
    {
      id: 'landlordContribution',
      name: 'Landlord Contribution',
      type: 'number',
      unit: 'USD',
      description: 'Amount landlord contributes through TI allowance'
    },
    {
      id: 'costOverrun',
      name: 'Cost Overrun',
      type: 'number',
      unit: 'USD',
      description: 'Potential cost overrun beyond TI allowance'
    },
    {
      id: 'costSavings',
      name: 'Cost Savings',
      type: 'number',
      unit: 'USD',
      description: 'Cost savings if construction costs are below TI allowance'
    },
    {
      id: 'hardCostsBreakdown',
      name: 'Hard Costs Breakdown',
      type: 'number',
      unit: 'USD',
      description: 'Breakdown of hard construction costs'
    },
    {
      id: 'softCostsBreakdown',
      name: 'Soft Costs Breakdown',
      type: 'number',
      unit: 'USD',
      description: 'Breakdown of soft costs'
    },
    {
      id: 'totalProjectCost',
      name: 'Total Project Cost',
      type: 'number',
      unit: 'USD',
      description: 'Total project cost including all expenses'
    },
    {
      id: 'costPerSqFt',
      name: 'Cost per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'Total cost per square foot'
    },
    {
      id: 'allowanceUtilizationRate',
      name: 'Allowance Utilization Rate',
      type: 'number',
      unit: '%',
      description: 'Percentage of TI allowance utilized'
    },
    {
      id: 'effectiveRent',
      name: 'Effective Rent',
      type: 'number',
      unit: 'USD/year',
      description: 'Effective annual rent after TI allowance'
    },
    {
      id: 'effectiveRentPerSqFt',
      name: 'Effective Rent per Sq Ft',
      type: 'number',
      unit: 'USD/sq ft/year',
      description: 'Effective rent per square foot'
    },
    {
      id: 'rentImpact',
      name: 'Rent Impact',
      type: 'number',
      unit: 'USD/year',
      description: 'Impact of TI allowance on annual rent'
    },
    {
      id: 'totalLeaseValue',
      name: 'Total Lease Value',
      type: 'number',
      unit: 'USD',
      description: 'Total value of the lease over its term'
    },
    {
      id: 'netPresentValue',
      name: 'Net Present Value',
      type: 'number',
      unit: 'USD',
      description: 'Net present value of the lease'
    },
    {
      id: 'constructionTimeline',
      name: 'Construction Timeline',
      type: 'number',
      unit: 'weeks',
      description: 'Total construction timeline in weeks'
    },
    {
      id: 'rentAbatementValue',
      name: 'Rent Abatement Value',
      type: 'number',
      unit: 'USD',
      description: 'Value of rent abatement during construction'
    },
    {
      id: 'earlyOccupancyValue',
      name: 'Early Occupancy Value',
      type: 'number',
      unit: 'USD',
      description: 'Value of early occupancy benefits'
    },
    {
      id: 'delayPenalties',
      name: 'Delay Penalties',
      type: 'number',
      unit: 'USD',
      description: 'Potential penalties for construction delays'
    },
    {
      id: 'marketComparison',
      name: 'Market Comparison',
      type: 'string',
      description: 'Comparison with market standards'
    },
    {
      id: 'competitivePosition',
      name: 'Competitive Position',
      type: 'string',
      description: 'Competitive position in the market'
    },
    {
      id: 'marketTiAllowanceComparison',
      name: 'Market TI Allowance Comparison',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'Comparison with market TI allowance'
    },
    {
      id: 'constructionCostComparison',
      name: 'Construction Cost Comparison',
      type: 'number',
      unit: 'USD/sq ft',
      description: 'Comparison with market construction costs'
    },
    {
      id: 'riskScore',
      name: 'Risk Score',
      type: 'number',
      description: 'Overall risk assessment score (1-100)'
    },
    {
      id: 'constructionRisk',
      name: 'Construction Risk',
      type: 'number',
      description: 'Construction risk assessment score (1-100)'
    },
    {
      id: 'financialRisk',
      name: 'Financial Risk',
      type: 'number',
      description: 'Financial risk assessment score (1-100)'
    },
    {
      id: 'marketRisk',
      name: 'Market Risk',
      type: 'number',
      description: 'Market risk assessment score (1-100)'
    },
    {
      id: 'timelineRisk',
      name: 'Timeline Risk',
      type: 'number',
      description: 'Timeline risk assessment score (1-100)'
    },
    {
      id: 'recommendation',
      name: 'Recommendation',
      type: 'string',
      description: 'Overall recommendation for the TI allowance'
    },
    {
      id: 'negotiationStrategy',
      name: 'Negotiation Strategy',
      type: 'string',
      description: 'Recommended negotiation strategy'
    },
    {
      id: 'costOptimizationSuggestions',
      name: 'Cost Optimization Suggestions',
      type: 'array',
      description: 'Suggestions for optimizing costs'
    },
    {
      id: 'riskMitigationStrategies',
      name: 'Risk Mitigation Strategies',
      type: 'array',
      description: 'Strategies for mitigating risks'
    },
    {
      id: 'alternativeApproaches',
      name: 'Alternative Approaches',
      type: 'array',
      description: 'Alternative approaches to consider'
    },
    {
      id: 'categoryBreakdown',
      name: 'Category Breakdown',
      type: 'object',
      description: 'Detailed breakdown by construction category'
    },
    {
      id: 'tenantROI',
      name: 'Tenant ROI',
      type: 'number',
      unit: '%',
      description: 'Return on investment for tenant'
    },
    {
      id: 'landlordROI',
      name: 'Landlord ROI',
      type: 'number',
      unit: '%',
      description: 'Return on investment for landlord'
    },
    {
      id: 'paybackPeriod',
      name: 'Payback Period',
      type: 'number',
      unit: 'years',
      description: 'Payback period for the investment'
    },
    {
      id: 'internalRateOfReturn',
      name: 'Internal Rate of Return',
      type: 'number',
      unit: '%',
      description: 'Internal rate of return for the investment'
    }
  ],
  calculate: (inputs: TenantImprovementAllowanceInputs) => {
    return calculateTenantImprovementAllowance(inputs);
  },
  generateReport: (inputs: TenantImprovementAllowanceInputs, outputs: TenantImprovementAllowanceOutputs) => {
    return generateTenantImprovementAllowanceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'TI Allowance Calculation',
      formula: 'TI Allowance = Base Amount × Square Footage (or Lump Sum)',
      description: 'Calculation of total TI allowance'
    },
    {
      name: 'Construction Cost',
      formula: 'Total Cost = Hard Costs + Soft Costs + Contingency',
      description: 'Total construction cost calculation'
    },
    {
      name: 'Tenant Contribution',
      formula: 'Tenant Contribution = Total Cost - TI Allowance',
      description: 'Amount tenant must contribute'
    },
    {
      name: 'Effective Rent',
      formula: 'Effective Rent = Base Rent - (TI Allowance / Lease Term)',
      description: 'Effective rent after TI allowance amortization'
    },
    {
      name: 'Cost per Square Foot',
      formula: 'Cost/Sq Ft = Total Construction Cost / Square Footage',
      description: 'Construction cost per square foot'
    },
    {
      name: 'Allowance Utilization',
      formula: 'Utilization Rate = (Total Cost / TI Allowance) × 100',
      description: 'Percentage of TI allowance utilized'
    }
  ],
  examples: [
    {
      name: 'Office Tenant - Class A Building',
      inputs: {
        leaseTerm: 5,
        rentableSquareFootage: 5000,
        usableSquareFootage: 4500,
        baseRent: 150000,
        baseRentPerSqFt: 30,
        annualRentEscalation: 3.0,
        tiAllowancePerSqFt: 45,
        totalTiAllowance: 225000,
        tiAllowanceType: 'per-sq-ft',
        tiAllowancePercentage: 0,
        constructionCostPerSqFt: 50,
        totalConstructionCost: 250000,
        softCosts: 25000,
        hardCosts: 200000,
        permitFees: 5000,
        architecturalFees: 15000,
        engineeringFees: 10000,
        projectManagementFees: 20000,
        demolitionCosts: 10000,
        structuralModifications: 20000,
        electricalWork: 30000,
        plumbingWork: 25000,
        hvacWork: 40000,
        flooringCosts: 15000,
        wallFinishes: 10000,
        ceilingWork: 8000,
        lightingCosts: 12000,
        millworkCosts: 20000,
        paintingCosts: 5000,
        fixturesCosts: 15000,
        technologyInfrastructure: 20000,
        securitySystems: 8000,
        signageCosts: 3000,
        constructionDuration: 12,
        rentCommencementDate: new Date('2024-01-01'),
        constructionStartDate: new Date('2023-10-01'),
        constructionEndDate: new Date('2023-12-31'),
        rentAbatementPeriod: 2,
        marketTiAllowance: 40,
        constructionCostIndex: 120,
        laborCostMultiplier: 1.2,
        materialCostMultiplier: 1.1,
        tenantType: 'office',
        tenantCreditRating: 'excellent',
        tenantFinancialStrength: 85,
        tenantIndustry: 'Technology',
        propertyType: 'office-building',
        propertyAge: 5,
        propertyClass: 'class-a',
        propertyLocation: 'urban',
        leaseType: 'modified-gross',
        operatingExpensePassThrough: true,
        realEstateTaxPassThrough: false,
        insurancePassThrough: false,
        buildoutSpecifications: 'warm-shell',
        sustainabilityRequirements: 'leed-silver',
        accessibilityCompliance: true,
        energyEfficiencyStandards: 'energy-star'
      }
    },
    {
      name: 'Retail Tenant - Shopping Center',
      inputs: {
        leaseTerm: 10,
        rentableSquareFootage: 3000,
        usableSquareFootage: 2800,
        baseRent: 90000,
        baseRentPerSqFt: 30,
        annualRentEscalation: 2.5,
        tiAllowancePerSqFt: 35,
        totalTiAllowance: 105000,
        tiAllowanceType: 'per-sq-ft',
        tiAllowancePercentage: 0,
        constructionCostPerSqFt: 40,
        totalConstructionCost: 120000,
        softCosts: 15000,
        hardCosts: 90000,
        permitFees: 3000,
        architecturalFees: 10000,
        engineeringFees: 5000,
        projectManagementFees: 12000,
        demolitionCosts: 8000,
        structuralModifications: 15000,
        electricalWork: 20000,
        plumbingWork: 18000,
        hvacWork: 25000,
        flooringCosts: 12000,
        wallFinishes: 8000,
        ceilingWork: 6000,
        lightingCosts: 10000,
        millworkCosts: 25000,
        paintingCosts: 4000,
        fixturesCosts: 20000,
        technologyInfrastructure: 8000,
        securitySystems: 5000,
        signageCosts: 8000,
        constructionDuration: 8,
        rentCommencementDate: new Date('2024-03-01'),
        constructionStartDate: new Date('2024-01-01'),
        constructionEndDate: new Date('2024-02-28'),
        rentAbatementPeriod: 1,
        marketTiAllowance: 30,
        constructionCostIndex: 110,
        laborCostMultiplier: 1.1,
        materialCostMultiplier: 1.0,
        tenantType: 'retail',
        tenantCreditRating: 'good',
        tenantFinancialStrength: 75,
        tenantIndustry: 'Fashion Retail',
        propertyType: 'shopping-center',
        propertyAge: 8,
        propertyClass: 'class-b',
        propertyLocation: 'suburban',
        leaseType: 'triple-net',
        operatingExpensePassThrough: true,
        realEstateTaxPassThrough: true,
        insurancePassThrough: true,
        buildoutSpecifications: 'cold-shell',
        sustainabilityRequirements: 'basic',
        accessibilityCompliance: true,
        energyEfficiencyStandards: 'standard'
      }
    },
    {
      name: 'Medical Tenant - Medical Office',
      inputs: {
        leaseTerm: 7,
        rentableSquareFootage: 8000,
        usableSquareFootage: 7200,
        baseRent: 320000,
        baseRentPerSqFt: 40,
        annualRentEscalation: 2.0,
        tiAllowancePerSqFt: 60,
        totalTiAllowance: 480000,
        tiAllowanceType: 'per-sq-ft',
        tiAllowancePercentage: 0,
        constructionCostPerSqFt: 75,
        totalConstructionCost: 600000,
        softCosts: 60000,
        hardCosts: 480000,
        permitFees: 15000,
        architecturalFees: 30000,
        engineeringFees: 25000,
        projectManagementFees: 35000,
        demolitionCosts: 20000,
        structuralModifications: 40000,
        electricalWork: 60000,
        plumbingWork: 50000,
        hvacWork: 80000,
        flooringCosts: 30000,
        wallFinishes: 20000,
        ceilingWork: 15000,
        lightingCosts: 25000,
        millworkCosts: 40000,
        paintingCosts: 10000,
        fixturesCosts: 50000,
        technologyInfrastructure: 40000,
        securitySystems: 15000,
        signageCosts: 5000,
        constructionDuration: 16,
        rentCommencementDate: new Date('2024-06-01'),
        constructionStartDate: new Date('2024-02-01'),
        constructionEndDate: new Date('2024-05-31'),
        rentAbatementPeriod: 3,
        marketTiAllowance: 55,
        constructionCostIndex: 130,
        laborCostMultiplier: 1.3,
        materialCostMultiplier: 1.2,
        tenantType: 'medical',
        tenantCreditRating: 'excellent',
        tenantFinancialStrength: 90,
        tenantIndustry: 'Healthcare',
        propertyType: 'medical-office',
        propertyAge: 3,
        propertyClass: 'class-a',
        propertyLocation: 'urban',
        leaseType: 'modified-gross',
        operatingExpensePassThrough: true,
        realEstateTaxPassThrough: false,
        insurancePassThrough: false,
        buildoutSpecifications: 'warm-shell',
        sustainabilityRequirements: 'leed-gold',
        accessibilityCompliance: true,
        energyEfficiencyStandards: 'energy-star'
      }
    }
  ],
  tags: [
    'tenant-improvement',
    'commercial-real-estate',
    'lease-negotiation',
    'construction-costs',
    'ti-allowance',
    'buildout',
    'commercial-lease',
    'construction-budget',
    'lease-analysis',
    'real-estate-investment'
  ],
  references: [
    {
      title: 'Commercial Real Estate TI Allowance Guide',
      url: 'https://www.rcm1.com/insights/ti-allowance-guide',
      description: 'Comprehensive guide to TI allowances in commercial real estate'
    },
    {
      title: 'Construction Cost Index',
      url: 'https://www.rsmeans.com/construction-cost-index',
      description: 'RS Means construction cost data and indices'
    },
    {
      title: 'Commercial Lease TI Allowance Standards',
      url: 'https://www.cre.org/standards/ti-allowances',
      description: 'Industry standards for tenant improvement allowances'
    }
  ]
};