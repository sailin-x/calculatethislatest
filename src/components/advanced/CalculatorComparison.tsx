import React, { useState, useEffect } from 'react';
import { CalculatorComparisonService, ComparisonScenario, ComparisonResult } from '../../services/CalculatorComparisonService';
import { AdvancedChart } from '../charts/AdvancedChart';
import { Calculator, CalculatorInput } from '../../types/Calculator';

interface CalculatorComparisonProps {
  calculator: Calculator;
  initialScenarios?: Array<{
    name: string;
    inputs: CalculatorInput[];
    notes?: string;
  }>;
  onSaveComparison?: (comparisonId: string) => void;
}

export const CalculatorComparison: React.FC<CalculatorComparisonProps> = ({
  calculator,
  initialScenarios = [],
  onSaveComparison
}) => {
  const [scenarios, setScenarios] = useState<Array<{
    name: string;
    inputs: CalculatorInput[];
    notes?: string;
  }>>(initialScenarios);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [comparisonName, setComparisonName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (scenarios.length >= 2) {
      runComparison();
    }
  }, [scenarios]);

  const runComparison = async () => {
    if (scenarios.length < 2) return;

    setIsCalculating(true);
    try {
      const result = CalculatorComparisonService.createComparison(calculator, scenarios);
      setComparison(result);
      
      // Set default selected metric
      if (result.analysis.keyMetrics.length > 0 && !selectedMetric) {
        setSelectedMetric(result.analysis.keyMetrics[0].label);
      }
    } catch (error) {
      console.error('Comparison failed:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const addScenario = () => {
    const newScenario = {
      name: `Scenario ${scenarios.length + 1}`,
      inputs: calculator.inputs.map(input => ({
        ...input,
        value: input.defaultValue || ''
      })),
      notes: ''
    };
    setScenarios([...scenarios, newScenario]);
  };

  const updateScenario = (index: number, updates: Partial<typeof scenarios[0]>) => {
    const updatedScenarios = scenarios.map((scenario, i) =>
      i === index ? { ...scenario, ...updates } : scenario
    );
    setScenarios(updatedScenarios);
  };

  const removeScenario = (index: number) => {
    if (scenarios.length <= 2) {
      alert('You need at least 2 scenarios for comparison');
      return;
    }
    setScenarios(scenarios.filter((_, i) => i !== index));
  };

  const saveComparison = () => {
    if (!comparison || !comparisonName.trim()) return;

    const comparisonId = CalculatorComparisonService.saveComparison(
      comparison,
      comparisonName.trim()
    );
    
    setShowSaveDialog(false);
    setComparisonName('');
    onSaveComparison?.(comparisonId);
  };

  const generateChart = () => {
    if (!comparison || !selectedMetric) return null;

    const metric = comparison.analysis.keyMetrics.find(m => m.label === selectedMetric);
    if (!metric) return null;

    const chartSeries = [{
      name: selectedMetric,
      data: metric.values.map((value, index) => ({
        x: comparison.scenarios[index]?.name || `Scenario ${index + 1}`,
        y: value.value,
        label: value.formattedValue,
        color: comparison.scenarios[index]?.color
      }))
    }];

    return (
      <AdvancedChart
        type="bar"
        series={chartSeries}
        title={`${selectedMetric} Comparison`}
        height={300}
        showLegend={false}
        exportable={true}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Compare {calculator.name} Scenarios
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={addScenario}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Scenario
          </button>
          {comparison && (
            <button
              onClick={() => setShowSaveDialog(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Comparison
            </button>
          )}
        </div>
      </div>

      {/* Scenarios Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((scenario, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={scenario.name}
                onChange={(e) => updateScenario(index, { name: e.target.value })}
                className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
              />
              <button
                onClick={() => removeScenario(index)}
                className="text-red-500 hover:text-red-700 p-1"
                disabled={scenarios.length <= 2}
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {scenario.inputs.map((input, inputIndex) => (
                <div key={inputIndex}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {input.label}
                  </label>
                  <input
                    type={input.type === 'number' ? 'number' : 'text'}
                    value={input.value}
                    onChange={(e) => {
                      const updatedInputs = scenario.inputs.map((inp, i) =>
                        i === inputIndex ? { ...inp, value: e.target.value } : inp
                      );
                      updateScenario(index, { inputs: updatedInputs });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={scenario.notes || ''}
                  onChange={(e) => updateScenario(index, { notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Add notes about this scenario..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Results */}
      {isCalculating && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Running comparison...</p>
        </div>
      )}

      {comparison && !isCalculating && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Comparison Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Scenarios:</span>{' '}
                {comparison.analysis.summary.totalScenarios}
              </div>
              <div>
                <span className="font-medium">Significant Differences:</span>{' '}
                {comparison.analysis.summary.significantDifferences}
              </div>
              {comparison.analysis.summary.recommendedScenario && (
                <div>
                  <span className="font-medium">Recommended:</span>{' '}
                  {comparison.scenarios.find(s => s.id === comparison.analysis.summary.recommendedScenario)?.name}
                </div>
              )}
            </div>
          </div>

          {/* Chart */}
          {comparison.analysis.keyMetrics.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Visual Comparison
                </h3>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {comparison.analysis.keyMetrics.map(metric => (
                    <option key={metric.label} value={metric.label}>
                      {metric.label}
                    </option>
                  ))}
                </select>
              </div>
              {generateChart()}
            </div>
          )}

          {/* Detailed Results */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detailed Results
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3">Metric</th>
                    {comparison.scenarios.map(scenario => (
                      <th key={scenario.id} className="text-left py-2 px-3">
                        {scenario.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.analysis.keyMetrics.map(metric => (
                    <tr key={metric.label} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-medium">{metric.label}</td>
                      {metric.values.map((value, index) => (
                        <td key={index} className="py-2 px-3">
                          <span
                            className={
                              value.scenarioId === metric.bestScenario
                                ? 'text-green-600 font-semibold'
                                : value.scenarioId === metric.worstScenario
                                ? 'text-red-600'
                                : ''
                            }
                          >
                            {value.formattedValue}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          {comparison.recommendations.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Recommendations
              </h3>
              <ul className="space-y-1 text-sm text-green-800">
                {comparison.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Save Comparison</h3>
            <input
              type="text"
              value={comparisonName}
              onChange={(e) => setComparisonName(e.target.value)}
              placeholder="Enter comparison name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveComparison}
                disabled={!comparisonName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorComparison;