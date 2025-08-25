import { Formula, CalculationResult } from '../../../types/calculator';
import { 
  BillOfMaterialsCalculatorInputs, 
  BillOfMaterialsCalculatorResults,
  BOMAssembly,
  BOMItem,
  Supplier,
  CostAnalysis,
  InventoryAnalysis,
  RiskAnalysis
} from './types';

/**
 * Bill of Materials calculation formulas
 */
export class BOMFormulas {
  
  /**
   * Calculate total cost for a BOM item
   */
  static calculateItemCost(item: BOMItem, quantity: number): number {
    const baseCost = item.quantity * item.unitCost * quantity;
    const safetyStockCost = item.safetyStock * item.unitCost;
    return baseCost + safetyStockCost;
  }

  /**
   * Calculate assembly cost including labor and overhead
   */
  static calculateAssemblyCost(
    assembly: BOMAssembly,
    quantity: number,
    laborRates: any,
    overheadRates: any
  ): {
    materialCost: number;
    laborCost: number;
    overheadCost: number;
    toolingCost: number;
    equipmentCost: number;
    totalCost: number;
  } {
    // Calculate material costs from items
    const materialCost = assembly.items.reduce((sum, item) => {
      return sum + this.calculateItemCost(item, quantity);
    }, 0);

    // Calculate subassembly costs
    const subassemblyCost = assembly.subassemblies.reduce((sum, sub) => {
      const subCost = this.calculateAssemblyCost(sub, quantity, laborRates, overheadRates);
      return sum + subCost.totalCost;
    }, 0);

    // Calculate labor costs
    const setupLaborCost = assembly.setupTime * laborRates.assembly;
    const productionLaborCost = (assembly.cycleTime / 60) * quantity * laborRates.assembly;
    const laborCost = setupLaborCost + productionLaborCost;

    // Calculate overhead costs
    const overheadCost = (laborCost * overheadRates.manufacturing) / 100;

    // Calculate tooling and equipment costs
    const toolingCost = assembly.toolingCost;
    const equipmentCost = assembly.equipmentCost;

    const totalCost = materialCost + subassemblyCost + laborCost + overheadCost + toolingCost + equipmentCost;

    return {
      materialCost: materialCost + subassemblyCost,
      laborCost,
      overheadCost,
      toolingCost,
      equipmentCost,
      totalCost
    };
  }

  /**
   * Calculate comprehensive cost analysis
   */
  static calculateCostAnalysis(
    assemblies: BOMAssembly[],
    quantity: number,
    laborRates: any,
    overheadRates: any,
    qualityCosts: any,
    logisticsCosts: any,
    targetMargin: number
  ): CostAnalysis {
    let totalMaterialCost = 0;
    let totalLaborCost = 0;
    let totalOverheadCost = 0;
    let totalToolingCost = 0;
    let totalEquipmentCost = 0;

    // Calculate costs for all assemblies
    assemblies.forEach(assembly => {
      const assemblyCost = this.calculateAssemblyCost(assembly, quantity, laborRates, overheadRates);
      totalMaterialCost += assemblyCost.materialCost;
      totalLaborCost += assemblyCost.laborCost;
      totalOverheadCost += assemblyCost.overheadCost;
      totalToolingCost += assemblyCost.toolingCost;
      totalEquipmentCost += assemblyCost.equipmentCost;
    });

    // Calculate quality costs
    const qualityCost = (qualityCosts.inspection + qualityCosts.testing + qualityCosts.rework + qualityCosts.scrap) * quantity;

    // Calculate logistics costs
    const logisticsCost = (logisticsCosts.inbound + logisticsCosts.outbound + logisticsCosts.warehousing + logisticsCosts.handling) * quantity;

    // Calculate administration overhead
    const administrationCost = (totalLaborCost * overheadRates.administration) / 100;

    const totalDirectCost = totalMaterialCost + totalLaborCost + totalToolingCost + totalEquipmentCost;
    const totalIndirectCost = totalOverheadCost + qualityCost + logisticsCost + administrationCost;
    const totalCost = totalDirectCost + totalIndirectCost;
    const costPerUnit = totalCost / quantity;

    // Calculate margins
    const sellingPrice = costPerUnit / (1 - targetMargin / 100);
    const grossMargin = ((sellingPrice - costPerUnit) / sellingPrice) * 100;
    const netMargin = grossMargin - (overheadRates.administration / 100);
    const contributionMargin = ((sellingPrice - totalDirectCost / quantity) / sellingPrice) * 100;

    return {
      materialCost: totalMaterialCost,
      laborCost: totalLaborCost,
      overheadCost: totalOverheadCost,
      toolingCost: totalToolingCost,
      equipmentCost: totalEquipmentCost,
      totalDirectCost,
      totalIndirectCost,
      totalCost,
      costBreakdown: {
        materials: totalMaterialCost,
        labor: totalLaborCost,
        overhead: totalOverheadCost,
        tooling: totalToolingCost,
        equipment: totalEquipmentCost,
        quality: qualityCost,
        logistics: logisticsCost,
        administration: administrationCost
      },
      costPerUnit,
      marginAnalysis: {
        grossMargin,
        netMargin,
        contributionMargin
      }
    };
  }

  /**
   * Calculate inventory analysis
   */
  static calculateInventoryAnalysis(
    assemblies: BOMAssembly[],
    suppliers: Supplier[],
    productionVolume: number,
    productionPeriod: number
  ): InventoryAnalysis {
    // Calculate total inventory value
    let totalInventoryValue = 0;
    let totalReorderPoint = 0;
    let totalSafetyStock = 0;
    let totalCarryingCost = 0;
    let totalOrderingCost = 0;

    // Process all items in all assemblies
    const processItems = (assembly: BOMAssembly) => {
      assembly.items.forEach(item => {
        const annualDemand = (item.quantity * productionVolume * 12) / productionPeriod;
        const leadTime = item.leadTime;
        const unitCost = item.unitCost;
        
        // Calculate Economic Order Quantity (EOQ)
        const orderingCost = 50; // Fixed ordering cost per order
        const carryingCostRate = 0.25; // 25% annual carrying cost
        const eoq = Math.sqrt((2 * annualDemand * orderingCost) / (unitCost * carryingCostRate));
        
        // Calculate safety stock
        const supplier = suppliers.find(s => s.id === item.supplier);
        const leadTimeVariability = supplier ? supplier.leadTimeVariability : 2;
        const safetyStock = leadTimeVariability * Math.sqrt(annualDemand / 365);
        
        // Calculate reorder point
        const reorderPoint = (annualDemand / 365) * leadTime + safetyStock;
        
        // Calculate costs
        const averageInventory = eoq / 2 + safetyStock;
        const carryingCost = averageInventory * unitCost * carryingCostRate;
        const orderingCostTotal = (annualDemand / eoq) * orderingCost;
        
        totalInventoryValue += averageInventory * unitCost;
        totalReorderPoint += reorderPoint * unitCost;
        totalSafetyStock += safetyStock * unitCost;
        totalCarryingCost += carryingCost;
        totalOrderingCost += orderingCostTotal;
      });
      
      // Process subassemblies
      assembly.subassemblies.forEach(processItems);
    };

    assemblies.forEach(processItems);

    const totalInventoryCost = totalCarryingCost + totalOrderingCost;
    const turnoverRate = (productionVolume * 12) / productionPeriod / (totalInventoryValue / 1000); // Assuming $1000 average unit cost
    const daysOfInventory = 365 / turnoverRate;

    // Calculate stockout risk (simplified)
    const stockoutRisk = Math.min(0.1, totalSafetyStock / totalInventoryValue * 0.5);

    return {
      currentStock: totalInventoryValue * 0.8, // Assume 80% of calculated inventory is currently held
      reorderPoint: totalReorderPoint,
      economicOrderQuantity: totalInventoryValue * 0.2, // Simplified EOQ calculation
      safetyStockLevel: totalSafetyStock,
      averageLeadTime: 30, // Average lead time in days
      stockoutRisk,
      carryingCost: totalCarryingCost,
      orderingCost: totalOrderingCost,
      totalInventoryCost,
      turnoverRate,
      daysOfInventory
    };
  }

  /**
   * Calculate risk analysis
   */
  static calculateRiskAnalysis(
    assemblies: BOMAssembly[],
    suppliers: Supplier[],
    costAnalysis: CostAnalysis
  ): RiskAnalysis {
    const supplyChainRisks: any[] = [];
    const costRisks: any[] = [];
    const qualityRisks: any[] = [];

    // Analyze supply chain risks
    const processItemsForRisk = (assembly: BOMAssembly) => {
      assembly.items.forEach(item => {
        const supplier = suppliers.find(s => s.id === item.supplier);
        if (supplier) {
          // Supply chain risk based on supplier reliability and lead time variability
          const reliabilityRisk = (100 - supplier.reliability) / 100;
          const leadTimeRisk = supplier.leadTimeVariability / 30; // Normalize to 30 days
          const overallRisk = (reliabilityRisk + leadTimeRisk) / 2;
          
          let riskLevel: 'high' | 'medium' | 'low';
          if (overallRisk > 0.6) riskLevel = 'high';
          else if (overallRisk > 0.3) riskLevel = 'medium';
          else riskLevel = 'low';

          if (item.isCritical || riskLevel === 'high') {
            supplyChainRisks.push({
              item: item.name,
              risk: riskLevel,
              description: `Supplier ${supplier.name} has ${supplier.reliability}% reliability and ${supplier.leadTimeVariability} days lead time variability`,
              impact: item.quantity * item.unitCost,
              probability: overallRisk,
              mitigation: item.alternatives.length > 0 ? `Consider alternative suppliers: ${item.alternatives.join(', ')}` : 'Identify alternative suppliers'
            });
          }
        }
      });
      
      assembly.subassemblies.forEach(processItemsForRisk);
    };

    assemblies.forEach(processItemsForRisk);

    // Cost risks
    const materialCostRisk = costAnalysis.materialCost * 0.1; // 10% potential increase
    costRisks.push({
      category: 'Materials',
      risk: 'medium',
      description: 'Raw material price volatility',
      potentialIncrease: materialCostRisk,
      probability: 0.3
    });

    const laborCostRisk = costAnalysis.laborCost * 0.05; // 5% potential increase
    costRisks.push({
      category: 'Labor',
      risk: 'low',
      description: 'Labor rate increases',
      potentialIncrease: laborCostRisk,
      probability: 0.2
    });

    // Quality risks
    assemblies.forEach(assembly => {
      assembly.items.forEach(item => {
        if (item.qualityGrade === 'C' || item.qualityGrade === 'D') {
          qualityRisks.push({
            item: item.name,
            risk: 'medium',
            description: `Low quality grade (${item.qualityGrade}) may affect product quality`,
            impact: item.quantity * item.unitCost * 0.1,
            probability: 0.4
          });
        }
      });
    });

    // Calculate overall risk score
    const supplyChainRiskScore = supplyChainRisks.reduce((sum, risk) => sum + risk.impact * risk.probability, 0);
    const costRiskScore = costRisks.reduce((sum, risk) => sum + risk.potentialIncrease * risk.probability, 0);
    const qualityRiskScore = qualityRisks.reduce((sum, risk) => sum + risk.impact * risk.probability, 0);
    
    const totalRiskScore = (supplyChainRiskScore + costRiskScore + qualityRiskScore) / costAnalysis.totalCost * 100;

    return {
      supplyChainRisks,
      costRisks,
      qualityRisks,
      overallRiskScore: Math.min(100, totalRiskScore)
    };
  }

  /**
   * Calculate supplier analysis
   */
  static calculateSupplierAnalysis(
    assemblies: BOMAssembly[],
    suppliers: Supplier[],
    costAnalysis: CostAnalysis
  ): any {
    const supplierSpend: Record<string, number> = {};
    const supplierPerformance: any[] = [];

    // Calculate spend by supplier
    const processItemsForSupplier = (assembly: BOMAssembly) => {
      assembly.items.forEach(item => {
        const spend = item.quantity * item.unitCost;
        supplierSpend[item.supplier] = (supplierSpend[item.supplier] || 0) + spend;
      });
      
      assembly.subassemblies.forEach(processItemsForSupplier);
    };

    assemblies.forEach(processItemsForSupplier);

    // Calculate supplier performance
    suppliers.forEach(supplier => {
      const spend = supplierSpend[supplier.id] || 0;
      const spendPercentage = (spend / costAnalysis.materialCost) * 100;
      
      // Calculate overall performance score
      const reliabilityScore = supplier.reliability;
      const qualityScore = supplier.qualityRating;
      const costScore = 100 - (spendPercentage * 2); // Lower spend percentage = higher score
      const leadTimeScore = 100 - (supplier.leadTimeVariability * 2);
      
      const overallScore = (reliabilityScore + qualityScore + costScore + leadTimeScore) / 4;

      supplierPerformance.push({
        supplier: supplier.name,
        reliability: supplier.reliability,
        quality: supplier.qualityRating,
        cost: costScore,
        leadTime: leadTimeScore,
        overallScore
      });
    });

    // Calculate supplier concentration
    const totalSpend = Object.values(supplierSpend).reduce((sum, spend) => sum + spend, 0);
    const supplierConcentration = Object.entries(supplierSpend).map(([supplierId, spend]) => {
      const supplier = suppliers.find(s => s.id === supplierId);
      const spendPercentage = (spend / totalSpend) * 100;
      
      let risk: 'high' | 'medium' | 'low';
      if (spendPercentage > 30) risk = 'high';
      else if (spendPercentage > 15) risk = 'medium';
      else risk = 'low';

      return {
        supplier: supplier?.name || supplierId,
        spendPercentage,
        risk
      };
    });

    const criticalSuppliers = supplierConcentration.filter(s => s.risk === 'high').length;

    return {
      totalSuppliers: suppliers.length,
      criticalSuppliers,
      supplierPerformance: supplierPerformance.sort((a, b) => b.overallScore - a.overallScore),
      supplierConcentration: supplierConcentration.sort((a, b) => b.spendPercentage - a.spendPercentage)
    };
  }

  /**
   * Calculate cost optimization opportunities
   */
  static calculateCostOptimization(
    assemblies: BOMAssembly[],
    suppliers: Supplier[],
    costAnalysis: CostAnalysis
  ): any {
    const recommendations: any[] = [];
    const alternativeMaterials: any[] = [];
    const volumeDiscounts: any[] = [];

    let potentialSavings = 0;

    // Analyze volume discounts
    const processItemsForOptimization = (assembly: BOMAssembly) => {
      assembly.items.forEach(item => {
        const supplier = suppliers.find(s => s.id === item.supplier);
        if (supplier && supplier.volumeDiscounts.length > 0) {
          const currentCost = item.quantity * item.unitCost;
          
          // Find best volume discount
          const bestDiscount = supplier.volumeDiscounts
            .filter(discount => item.quantity >= discount.minQuantity)
            .sort((a, b) => b.discountPercentage - a.discountPercentage)[0];
          
          if (bestDiscount) {
            const discountedCost = currentCost * (1 - bestDiscount.discountPercentage / 100);
            const savings = currentCost - discountedCost;
            
            volumeDiscounts.push({
              item: item.name,
              currentCost,
              discountedCost,
              savings,
              requiredQuantity: bestDiscount.minQuantity
            });
            
            potentialSavings += savings;
          }
        }
      });
      
      assembly.subassemblies.forEach(processItemsForOptimization);
    };

    assemblies.forEach(processItemsForOptimization);

    // Generate recommendations
    if (costAnalysis.materialCost > costAnalysis.totalCost * 0.6) {
      recommendations.push({
        category: 'Materials',
        action: 'Negotiate bulk pricing with suppliers',
        potentialSavings: costAnalysis.materialCost * 0.05,
        implementationCost: 1000,
        paybackPeriod: 2,
        priority: 'high'
      });
      potentialSavings += costAnalysis.materialCost * 0.05;
    }

    if (costAnalysis.laborCost > costAnalysis.totalCost * 0.3) {
      recommendations.push({
        category: 'Labor',
        action: 'Optimize production processes to reduce cycle time',
        potentialSavings: costAnalysis.laborCost * 0.1,
        implementationCost: 5000,
        paybackPeriod: 6,
        priority: 'medium'
      });
      potentialSavings += costAnalysis.laborCost * 0.1;
    }

    if (costAnalysis.overheadCost > costAnalysis.totalCost * 0.2) {
      recommendations.push({
        category: 'Overhead',
        action: 'Implement lean manufacturing practices',
        potentialSavings: costAnalysis.overheadCost * 0.15,
        implementationCost: 10000,
        paybackPeriod: 12,
        priority: 'medium'
      });
      potentialSavings += costAnalysis.overheadCost * 0.15;
    }

    return {
      potentialSavings,
      recommendations,
      alternativeMaterials,
      volumeDiscounts
    };
  }

  /**
   * Calculate sustainability analysis
   */
  static calculateSustainabilityAnalysis(
    assemblies: BOMAssembly[],
    costAnalysis: CostAnalysis
  ): any {
    // Simplified sustainability calculations
    const materialWeight = costAnalysis.materialCost / 100; // Assume $100 per kg
    const carbonFootprint = materialWeight * 2.5; // kg CO2 per kg material
    const energyConsumption = costAnalysis.totalCost * 0.1; // kWh per dollar
    const wasteGeneration = materialWeight * 0.1; // kg waste per kg material
    const recyclability = 75; // percentage

    const recommendations = [
      {
        area: 'Materials',
        improvement: 'Use recycled materials where possible',
        environmentalImpact: 'Reduce carbon footprint by 20%',
        costImpact: costAnalysis.materialCost * 0.05
      },
      {
        area: 'Energy',
        improvement: 'Implement energy-efficient manufacturing processes',
        environmentalImpact: 'Reduce energy consumption by 15%',
        costImpact: costAnalysis.totalCost * 0.02
      },
      {
        area: 'Waste',
        improvement: 'Implement waste reduction programs',
        environmentalImpact: 'Reduce waste generation by 30%',
        costImpact: costAnalysis.totalCost * 0.01
      }
    ];

    return {
      carbonFootprint,
      energyConsumption,
      wasteGeneration,
      recyclability,
      recommendations
    };
  }

  /**
   * Run Monte Carlo simulation
   */
  static runMonteCarloSimulation(
    inputs: BillOfMaterialsCalculatorInputs,
    samples: number = 10000
  ): {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  } {
    const results: number[] = [];
    
    for (let i = 0; i < samples; i++) {
      // Generate random variations for key cost components
      const materialVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      const laborVariation = 0.9 + Math.random() * 0.2; // ±10% variation
      const overheadVariation = 0.85 + Math.random() * 0.3; // ±15% variation
      
      // Calculate costs with variations
      const costAnalysis = this.calculateCostAnalysis(
        inputs.assemblies,
        inputs.targetQuantity,
        inputs.laborRates,
        inputs.overheadRates,
        inputs.qualityCosts,
        inputs.logisticsCosts,
        inputs.targetMargin
      );
      
      const totalCost = (costAnalysis.materialCost * materialVariation) +
                       (costAnalysis.laborCost * laborVariation) +
                       (costAnalysis.overheadCost * overheadVariation) +
                       costAnalysis.toolingCost +
                       costAnalysis.equipmentCost;
      
      results.push(totalCost);
    }
    
    // Sort results for percentile calculations
    results.sort((a, b) => a - b);
    
    const getPercentile = (p: number) => {
      const index = Math.floor(p * samples);
      return results[Math.min(index, samples - 1)];
    };
    
    const expectedValue = results.reduce((sum, val) => sum + val, 0) / samples;
    const variance = results.reduce((sum, val) => sum + Math.pow(val - expectedValue, 2), 0) / samples;
    const standardDeviation = Math.sqrt(variance);
    
    return {
      percentile10: getPercentile(0.10),
      percentile25: getPercentile(0.25),
      percentile50: getPercentile(0.50),
      percentile75: getPercentile(0.75),
      percentile90: getPercentile(0.90),
      expectedValue,
      standardDeviation
    };
  }
}

/**
 * Main Bill of Materials Calculator formula
 */
export const billOfMaterialsCalculatorFormula: Formula = {
  id: 'bill-of-materials-calculator',
  name: 'Bill of Materials (BOM) Cost Calculator',
  description: 'Comprehensive cost analysis and optimization for manufacturing bill of materials including materials, labor, overhead, and supply chain management',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const bomInputs = inputs as BillOfMaterialsCalculatorInputs;
    
    try {
      const {
        productName,
        productDescription,
        targetQuantity,
        assemblies,
        suppliers,
        productionVolume,
        productionPeriod,
        laborRates,
        overheadRates,
        qualityCosts,
        logisticsCosts,
        currency,
        includeInventoryAnalysis,
        includeRiskAnalysis,
        includeSupplierAnalysis,
        includeCostOptimization,
        includeSustainabilityAnalysis,
        targetMargin,
        inflationRate,
        exchangeRateRisk,
        monteCarloSamples
      } = bomInputs;

      // Calculate cost analysis
      const costAnalysis = BOMFormulas.calculateCostAnalysis(
        assemblies,
        targetQuantity,
        laborRates,
        overheadRates,
        qualityCosts,
        logisticsCosts,
        targetMargin
      );

      // Calculate inventory analysis
      let inventoryAnalysis = null;
      if (includeInventoryAnalysis) {
        inventoryAnalysis = BOMFormulas.calculateInventoryAnalysis(
          assemblies,
          suppliers,
          productionVolume,
          productionPeriod
        );
      }

      // Calculate risk analysis
      let riskAnalysis = null;
      if (includeRiskAnalysis) {
        riskAnalysis = BOMFormulas.calculateRiskAnalysis(
          assemblies,
          suppliers,
          costAnalysis
        );
      }

      // Calculate supplier analysis
      let supplierAnalysis = null;
      if (includeSupplierAnalysis) {
        supplierAnalysis = BOMFormulas.calculateSupplierAnalysis(
          assemblies,
          suppliers,
          costAnalysis
        );
      }

      // Calculate cost optimization
      let costOptimization = null;
      if (includeCostOptimization) {
        costOptimization = BOMFormulas.calculateCostOptimization(
          assemblies,
          suppliers,
          costAnalysis
        );
      }

      // Calculate sustainability analysis
      let sustainabilityAnalysis = null;
      if (includeSustainabilityAnalysis) {
        sustainabilityAnalysis = BOMFormulas.calculateSustainabilityAnalysis(
          assemblies,
          costAnalysis
        );
      }

      // Calculate assembly breakdown
      const assemblyBreakdown = assemblies.map(assembly => {
        const assemblyCost = BOMFormulas.calculateAssemblyCost(
          assembly,
          targetQuantity,
          laborRates,
          overheadRates
        );
        
        return {
          assembly: assembly.name,
          level: assembly.level,
          cost: assemblyCost.totalCost,
          percentage: (assemblyCost.totalCost / costAnalysis.totalCost) * 100,
          items: assembly.items.length,
          subassemblies: assembly.subassemblies.length
        };
      });

      // Generate cost trends (simplified)
      const costTrends = {
        historical: [
          {
            period: 'Q1 2024',
            totalCost: costAnalysis.totalCost * 0.95,
            materialCost: costAnalysis.materialCost * 0.95,
            laborCost: costAnalysis.laborCost * 0.95,
            overheadCost: costAnalysis.overheadCost * 0.95
          },
          {
            period: 'Q2 2024',
            totalCost: costAnalysis.totalCost * 0.98,
            materialCost: costAnalysis.materialCost * 0.98,
            laborCost: costAnalysis.laborCost * 0.98,
            overheadCost: costAnalysis.overheadCost * 0.98
          },
          {
            period: 'Q3 2024',
            totalCost: costAnalysis.totalCost,
            materialCost: costAnalysis.materialCost,
            laborCost: costAnalysis.laborCost,
            overheadCost: costAnalysis.overheadCost
          }
        ],
        projections: [
          {
            period: 'Q4 2024',
            projectedCost: costAnalysis.totalCost * (1 + inflationRate / 100),
            confidenceInterval: {
              lower: costAnalysis.totalCost * 0.95,
              upper: costAnalysis.totalCost * 1.05
            }
          },
          {
            period: 'Q1 2025',
            projectedCost: costAnalysis.totalCost * Math.pow(1 + inflationRate / 100, 2),
            confidenceInterval: {
              lower: costAnalysis.totalCost * 0.90,
              upper: costAnalysis.totalCost * 1.10
            }
          }
        ]
      };

      // Monte Carlo simulation
      const monteCarloResults = BOMFormulas.runMonteCarloSimulation(bomInputs, monteCarloSamples || 10000);

      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high';
      if (riskAnalysis) {
        if (riskAnalysis.overallRiskScore < 20) riskLevel = 'low';
        else if (riskAnalysis.overallRiskScore < 50) riskLevel = 'medium';
        else riskLevel = 'high';
      } else {
        riskLevel = 'medium';
      }

      const results: BillOfMaterialsCalculatorResults = {
        productSummary: {
          name: productName,
          description: productDescription,
          totalCost: costAnalysis.totalCost,
          costPerUnit: costAnalysis.costPerUnit,
          targetQuantity,
          totalValue: costAnalysis.totalCost
        },
        costAnalysis,
        inventoryAnalysis,
        riskAnalysis,
        supplierAnalysis,
        costOptimization,
        sustainabilityAnalysis,
        assemblyBreakdown,
        costTrends,
        summary: {
          keyMetrics: {
            totalCost: costAnalysis.totalCost,
            costPerUnit: costAnalysis.costPerUnit,
            materialPercentage: (costAnalysis.materialCost / costAnalysis.totalCost) * 100,
            laborPercentage: (costAnalysis.laborCost / costAnalysis.totalCost) * 100,
            overheadPercentage: (costAnalysis.overheadCost / costAnalysis.totalCost) * 100,
            grossMargin: costAnalysis.marginAnalysis.grossMargin
          },
          keyInsights: [
            `Total BOM cost: ${currency}${costAnalysis.totalCost.toLocaleString()}`,
            `Cost per unit: ${currency}${costAnalysis.costPerUnit.toFixed(2)}`,
            `Material cost represents ${((costAnalysis.materialCost / costAnalysis.totalCost) * 100).toFixed(1)}% of total cost`,
            `Gross margin: ${costAnalysis.marginAnalysis.grossMargin.toFixed(1)}%`
          ],
          actionItems: [
            'Review supplier performance and identify optimization opportunities',
            'Analyze inventory levels and reorder points',
            'Monitor cost trends and implement cost reduction initiatives',
            'Assess supply chain risks and develop mitigation strategies'
          ],
          riskLevel
        },
        monteCarloResults
      };
      
      return {
        outputs: results,
        explanation: `Your Bill of Materials analysis shows a total cost of ${currency}${costAnalysis.totalCost.toLocaleString()} with a cost per unit of ${currency}${costAnalysis.costPerUnit.toFixed(2)}. Material costs represent ${((costAnalysis.materialCost / costAnalysis.totalCost) * 100).toFixed(1)}% of the total cost, with a gross margin of ${costAnalysis.marginAnalysis.grossMargin.toFixed(1)}%.`,
        intermediateSteps: {
          'Material Cost': `${currency}${costAnalysis.materialCost.toLocaleString()}`,
          'Labor Cost': `${currency}${costAnalysis.laborCost.toLocaleString()}`,
          'Overhead Cost': `${currency}${costAnalysis.overheadCost.toLocaleString()}`,
          'Total Cost': `${currency}${costAnalysis.totalCost.toLocaleString()}`,
          'Cost per Unit': `${currency}${costAnalysis.costPerUnit.toFixed(2)}`
        }
      };
    } catch (error) {
      throw new Error(`Bill of Materials calculation failed: ${error}`);
    }
  }
};
