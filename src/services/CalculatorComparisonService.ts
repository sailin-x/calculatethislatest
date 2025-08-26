import { Calculator, CalculatorInput, CalculatorOutput } from '../types/calculator';
import { CalculationRecord } from './CalculationHistoryService';

export interface ComparisonScenario {
  id: string;
  name: string;
  calculator: Calculator;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  notes?: string;
  color?: string;
}

export interface ComparisonResult {
  scenarios: ComparisonScenario[];
  analysis: ComparisonAnalysis;
  recommendations: string[];
}

export interface ComparisonAnalysis {
  keyMetrics: Array<{
    label: string;
    values: Array<{
      scenarioId: string;
      value: number;
      formattedValue: string;
    }>;
    bestScenario?: string;
    worstScenario?: string;
    variance: number;
  }>;
  summary: {
    totalScenarios: number;
    significantDifferences: number;
    recommendedScenario?: string;
  };
}

export class CalculatorComparisonService {
  private static readonly STORAGE_KEY = 'calculator_comparisons';
  private static readonly SCENARIO_COLORS = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  static createComparison(
    calculator: Calculator,
    scenarios: Array<{
      name: string;
      inputs: CalculatorInput[];
      notes?: string;
    }>
  ): ComparisonResult {
    const comparisonScenarios: ComparisonScenario[] = scenarios.map((scenario, index) => {
      // Calculate outputs for this scenario
      const outputs = this.calculateOutputs(calculator, scenario.inputs);
      
      return {
        id: this.generateScenarioId(),
        name: scenario.name,
        calculator,
        inputs: scenario.inputs,
        outputs,
        notes: scenario.notes,
        color: this.SCENARIO_COLORS[index % this.SCENARIO_COLORS.length]
      };
    });

    const analysis = this.analyzeComparison(comparisonScenarios);
    const recommendations = this.generateRecommendations(comparisonScenarios, analysis);

    return {
      scenarios: comparisonScenarios,
      analysis,
      recommendations
    };
  }

  static compareCalculationRecords(records: CalculationRecord[]): ComparisonResult {
    if (records.length === 0) {
      throw new Error('No calculation records provided for comparison');
    }

    // Ensure all records are from the same calculator
    const calculatorId = records[0].calculatorId;
    if (!records.every(record => record.calculatorId === calculatorId)) {
      throw new Error('All calculation records must be from the same calculator');
    }

    const scenarios: ComparisonScenario[] = records.map((record, index) => ({
      id: record.id,
      name: record.notes || `Scenario ${index + 1}`,
      calculator: {
        id: record.calculatorId,
        name: record.calculatorName
      } as Calculator,
      inputs: record.inputs,
      outputs: record.outputs,
      notes: record.notes,
      color: this.SCENARIO_COLORS[index % this.SCENARIO_COLORS.length]
    }));

    const analysis = this.analyzeComparison(scenarios);
    const recommendations = this.generateRecommendations(scenarios, analysis);

    return {
      scenarios,
      analysis,
      recommendations
    };
  }

  static saveComparison(comparison: ComparisonResult, name: string): string {
    const comparisonId = this.generateComparisonId();
    const savedComparison = {
      id: comparisonId,
      name,
      timestamp: new Date(),
      ...comparison
    };

    const comparisons = this.loadComparisons();
    comparisons.push(savedComparison);
    this.saveComparisons(comparisons);

    return comparisonId;
  }

  static loadComparison(comparisonId: string): ComparisonResult | null {
    const comparisons = this.loadComparisons();
    const comparison = comparisons.find(c => c.id === comparisonId);
    return comparison || null;
  }

  static getAllComparisons(): Array<{
    id: string;
    name: string;
    timestamp: Date;
    calculatorName: string;
    scenarioCount: number;
  }> {
    const comparisons = this.loadComparisons();
    return comparisons.map(comparison => ({
      id: comparison.id,
      name: comparison.name,
      timestamp: comparison.timestamp,
      calculatorName: comparison.scenarios[0]?.calculator.name || 'Unknown',
      scenarioCount: comparison.scenarios.length
    }));
  }

  static deleteComparison(comparisonId: string): boolean {
    const comparisons = this.loadComparisons();
    const filteredComparisons = comparisons.filter(c => c.id !== comparisonId);
    
    if (filteredComparisons.length !== comparisons.length) {
      this.saveComparisons(filteredComparisons);
      return true;
    }
    
    return false;
  }

  static generateComparisonChart(
    scenarios: ComparisonScenario[],
    metricLabel: string
  ): {
    type: 'bar' | 'line' | 'pie';
    data: any;
    options: any;
  } {
    const metricValues = scenarios.map(scenario => {
      const output = scenario.outputs.find(o => o.label === metricLabel);
      return {
        scenario: scenario.name,
        value: Number(output?.value || 0),
        color: scenario.color
      };
    });

    return {
      type: 'bar',
      data: {
        labels: metricValues.map(mv => mv.scenario),
        datasets: [{
          label: metricLabel,
          data: metricValues.map(mv => mv.value),
          backgroundColor: metricValues.map(mv => mv.color),
          borderColor: metricValues.map(mv => mv.color),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${metricLabel} Comparison`
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  }

  private static calculateOutputs(
    calculator: Calculator,
    inputs: CalculatorInput[]
  ): CalculatorOutput[] {
    // This would integrate with the CalculatorEngine
    // For now, return empty array as placeholder
    return [];
  }

  private static analyzeComparison(scenarios: ComparisonScenario[]): ComparisonAnalysis {
    if (scenarios.length === 0) {
      return {
        keyMetrics: [],
        summary: {
          totalScenarios: 0,
          significantDifferences: 0
        }
      };
    }

    // Get all unique output labels
    const allOutputLabels = new Set<string>();
    scenarios.forEach(scenario => {
      scenario.outputs.forEach(output => {
        allOutputLabels.add(output.label);
      });
    });

    const keyMetrics = Array.from(allOutputLabels).map(label => {
      const values = scenarios.map(scenario => {
        const output = scenario.outputs.find(o => o.label === label);
        const numericValue = Number(output?.value || 0);
        
        return {
          scenarioId: scenario.id,
          value: numericValue,
          formattedValue: this.formatValue(output?.value, output?.type)
        };
      });

      const numericValues = values.map(v => v.value);
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);
      const variance = max - min;

      const bestScenario = scenarios.find(s => 
        s.outputs.find(o => o.label === label && Number(o.value) === max)
      )?.id;

      const worstScenario = scenarios.find(s => 
        s.outputs.find(o => o.label === label && Number(o.value) === min)
      )?.id;

      return {
        label,
        values,
        bestScenario,
        worstScenario,
        variance
      };
    });

    const significantDifferences = keyMetrics.filter(metric => 
      metric.variance > (Math.max(...metric.values.map(v => v.value)) * 0.1)
    ).length;

    return {
      keyMetrics,
      summary: {
        totalScenarios: scenarios.length,
        significantDifferences,
        recommendedScenario: this.findRecommendedScenario(scenarios, keyMetrics)
      }
    };
  }

  private static generateRecommendations(
    scenarios: ComparisonScenario[],
    analysis: ComparisonAnalysis
  ): string[] {
    const recommendations: string[] = [];

    if (analysis.summary.recommendedScenario) {
      const recommendedScenario = scenarios.find(s => s.id === analysis.summary.recommendedScenario);
      if (recommendedScenario) {
        recommendations.push(`Based on the analysis, "${recommendedScenario.name}" appears to be the optimal scenario.`);
      }
    }

    if (analysis.summary.significantDifferences > 0) {
      recommendations.push(`${analysis.summary.significantDifferences} metrics show significant differences between scenarios.`);
    }

    // Add specific metric recommendations
    analysis.keyMetrics.forEach(metric => {
      if (metric.variance > 0) {
        const bestScenario = scenarios.find(s => s.id === metric.bestScenario);
        if (bestScenario) {
          recommendations.push(`For ${metric.label}, "${bestScenario.name}" performs best.`);
        }
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('All scenarios show similar results. Consider other factors in your decision.');
    }

    return recommendations;
  }

  private static findRecommendedScenario(
    scenarios: ComparisonScenario[],
    keyMetrics: ComparisonAnalysis['keyMetrics']
  ): string | undefined {
    // Simple scoring system - scenario that performs best in most metrics
    const scenarioScores = new Map<string, number>();

    scenarios.forEach(scenario => {
      scenarioScores.set(scenario.id, 0);
    });

    keyMetrics.forEach(metric => {
      if (metric.bestScenario) {
        const currentScore = scenarioScores.get(metric.bestScenario) || 0;
        scenarioScores.set(metric.bestScenario, currentScore + 1);
      }
    });

    let bestScenario = '';
    let bestScore = -1;

    scenarioScores.forEach((score, scenarioId) => {
      if (score > bestScore) {
        bestScore = score;
        bestScenario = scenarioId;
      }
    });

    return bestScore > 0 ? bestScenario : undefined;
  }

  private static formatValue(value: any, type?: string): string {
    if (value === null || value === undefined) return '';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Number(value));
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      case 'number':
        return Number(value).toLocaleString();
      default:
        return String(value);
    }
  }

  private static loadComparisons(): any[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading comparisons:', error);
      return [];
    }
  }

  private static saveComparisons(comparisons: any[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comparisons));
    } catch (error) {
      console.error('Error saving comparisons:', error);
    }
  }

  private static generateScenarioId(): string {
    return `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static generateComparisonId(): string {
    return `comparison_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}