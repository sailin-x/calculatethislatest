/**
 * Bill of Materials (BOM) Cost Calculator Types
 */

export interface BOMItem {
  id: string;
  name: string;
  description: string;
  category: 'raw-material' | 'component' | 'subassembly' | 'packaging' | 'consumable' | 'tooling' | 'overhead';
  unit: 'piece' | 'kg' | 'meter' | 'liter' | 'square-meter' | 'cubic-meter' | 'hour' | 'set';
  quantity: number;
  unitCost: number;
  supplier: string;
  leadTime: number; // days
  minimumOrderQuantity: number;
  safetyStock: number;
  qualityGrade: 'A' | 'B' | 'C' | 'D';
  isCritical: boolean;
  alternatives: string[]; // alternative supplier IDs
  notes: string;
}

export interface BOMAssembly {
  id: string;
  name: string;
  description: string;
  level: number; // assembly level in hierarchy
  parentId?: string;
  items: BOMItem[];
  subassemblies: BOMAssembly[];
  laborHours: number;
  laborRate: number;
  overheadRate: number;
  yield: number; // percentage of good units from total produced
  scrapRate: number; // percentage of units that become scrap
  setupTime: number; // hours
  cycleTime: number; // minutes per unit
  equipmentCost: number;
  toolingCost: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: number; // days
  reliability: number; // 0-100
  qualityRating: number; // 0-100
  leadTimeVariability: number; // standard deviation in days
  minimumOrderValue: number;
  volumeDiscounts: Array<{
    minQuantity: number;
    discountPercentage: number;
  }>;
}

export interface CostAnalysis {
  materialCost: number;
  laborCost: number;
  overheadCost: number;
  toolingCost: number;
  equipmentCost: number;
  totalDirectCost: number;
  totalIndirectCost: number;
  totalCost: number;
  costBreakdown: {
    materials: number;
    labor: number;
    overhead: number;
    tooling: number;
    equipment: number;
    quality: number;
    logistics: number;
    administration: number;
  };
  costPerUnit: number;
  marginAnalysis: {
    grossMargin: number;
    netMargin: number;
    contributionMargin: number;
  };
}

export interface InventoryAnalysis {
  currentStock: number;
  reorderPoint: number;
  economicOrderQuantity: number;
  safetyStockLevel: number;
  averageLeadTime: number;
  stockoutRisk: number;
  carryingCost: number;
  orderingCost: number;
  totalInventoryCost: number;
  turnoverRate: number;
  daysOfInventory: number;
}

export interface RiskAnalysis {
  supplyChainRisks: Array<{
    item: string;
    risk: 'high' | 'medium' | 'low';
    description: string;
    impact: number;
    probability: number;
    mitigation: string;
  }>;
  costRisks: Array<{
    category: string;
    risk: 'high' | 'medium' | 'low';
    description: string;
    potentialIncrease: number;
    probability: number;
  }>;
  qualityRisks: Array<{
    item: string;
    risk: 'high' | 'medium' | 'low';
    description: string;
    impact: number;
    probability: number;
  }>;
  overallRiskScore: number;
}

export interface BillOfMaterialsCalculatorInputs {
  productName: string;
  productDescription: string;
  targetQuantity: number;
  assemblies: BOMAssembly[];
  suppliers: Supplier[];
  productionVolume: number;
  productionPeriod: number; // months
  laborRates: {
    assembly: number;
    testing: number;
    packaging: number;
    quality: number;
  };
  overheadRates: {
    manufacturing: number;
    quality: number;
    logistics: number;
    administration: number;
  };
  qualityCosts: {
    inspection: number;
    testing: number;
    rework: number;
    scrap: number;
  };
  logisticsCosts: {
    inbound: number;
    outbound: number;
    warehousing: number;
    handling: number;
  };
  currency: string;
  includeInventoryAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeSupplierAnalysis: boolean;
  includeCostOptimization: boolean;
  includeSustainabilityAnalysis: boolean;
  targetMargin: number;
  inflationRate: number;
  exchangeRateRisk: boolean;
  monteCarloSamples: number;
  confidenceLevel: number;
}

export interface BillOfMaterialsCalculatorResults {
  productSummary: {
    name: string;
    description: string;
    totalCost: number;
    costPerUnit: number;
    targetQuantity: number;
    totalValue: number;
  };
  costAnalysis: CostAnalysis;
  inventoryAnalysis: InventoryAnalysis;
  riskAnalysis: RiskAnalysis;
  supplierAnalysis: {
    totalSuppliers: number;
    criticalSuppliers: number;
    supplierPerformance: Array<{
      supplier: string;
      reliability: number;
      quality: number;
      cost: number;
      leadTime: number;
      overallScore: number;
    }>;
    supplierConcentration: Array<{
      supplier: string;
      spendPercentage: number;
      risk: 'high' | 'medium' | 'low';
    }>;
  };
  costOptimization: {
    potentialSavings: number;
    recommendations: Array<{
      category: string;
      action: string;
      potentialSavings: number;
      implementationCost: number;
      paybackPeriod: number;
      priority: 'high' | 'medium' | 'low';
    }>;
    alternativeMaterials: Array<{
      currentItem: string;
      alternative: string;
      costSavings: number;
      qualityImpact: string;
      availability: string;
    }>;
    volumeDiscounts: Array<{
      item: string;
      currentCost: number;
      discountedCost: number;
      savings: number;
      requiredQuantity: number;
    }>;
  };
  sustainabilityAnalysis: {
    carbonFootprint: number;
    energyConsumption: number;
    wasteGeneration: number;
    recyclability: number;
    recommendations: Array<{
      area: string;
      improvement: string;
      environmentalImpact: string;
      costImpact: number;
    }>;
  };
  assemblyBreakdown: Array<{
    assembly: string;
    level: number;
    cost: number;
    percentage: number;
    items: number;
    subassemblies: number;
  }>;
  costTrends: {
    historical: Array<{
      period: string;
      totalCost: number;
      materialCost: number;
      laborCost: number;
      overheadCost: number;
    }>;
    projections: Array<{
      period: string;
      projectedCost: number;
      confidenceInterval: {
        lower: number;
        upper: number;
      };
    }>;
  };
  summary: {
    keyMetrics: {
      totalCost: number;
      costPerUnit: number;
      materialPercentage: number;
      laborPercentage: number;
      overheadPercentage: number;
      grossMargin: number;
    };
    keyInsights: string[];
    actionItems: string[];
    riskLevel: 'low' | 'medium' | 'high';
  };
  monteCarloResults: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  };
}
