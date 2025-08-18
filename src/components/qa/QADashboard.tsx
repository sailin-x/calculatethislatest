import React, { useState, useEffect } from 'react';
import { QualityAssuranceService, QATestResult } from '../../services/QualityAssuranceService';
import { IndustryValidationComponent } from './IndustryValidation';
import { AdvancedChart } from '../charts/AdvancedChart';

interface QADashboardProps {
  calculatorId: string;
}

export const QADashboard: React.FC<QADashboardProps> = ({ calculatorId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'validation' | 'reports'>('overview');
  const [testResults, setTestResults] = useState<QATestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [qaReport, setQaReport] = useState<any>(null);

  useEffect(() => {
    loadQAData();
  }, [calculatorId]);

  const loadQAData = async () => {
    try {
      const report = await QualityAssuranceService.generateQAReport(calculatorId);
      setQaReport(report);
      setTestResults(report.testResults);
    } catch (error) {
      console.error('Failed to load QA data:', error);
    }
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    try {
      // Run all test types
      await Promise.all([
        QualityAssuranceService.runAccuracyTests(calculatorId),
        QualityAssuranceService.runPerformanceTests(calculatorId),
        QualityAssuranceService.runAccessibilityTests(calculatorId),
        QualityAssuranceService.checkRegulatoryCompliance(calculatorId, ['GDPR', 'CCPA'])
      ]);
      
      await loadQAData();
    } catch (error) {
      console.error('Failed to run tests:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const runSpecificTest = async (testType: 'accuracy' | 'performance' | 'accessibility' | 'security') => {
    setIsRunningTests(true);
    try {
      switch (testType) {
        case 'accuracy':
          await QualityAssuranceService.runAccuracyTests(calculatorId);
          break;
        case 'performance':
          await QualityAssuranceService.runPerformanceTests(calculatorId);
          break;
        case 'accessibility':
          await QualityAssuranceService.runAccessibilityTests(calculatorId);
          break;
        case 'security':
          await QualityAssuranceService.checkRegulatoryCompliance(calculatorId, ['GDPR', 'CCPA']);
          break;
      }
      
      await loadQAData();
    } catch (error) {
      console.error(`Failed to run ${testType} test:`, error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const getStatusColor = (status: QATestResult['status']) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTestTypeIcon = (testType: QATestResult['testType']) => {
    switch (testType) {
      case 'accuracy': return '🎯';
      case 'performance': return '⚡';
      case 'accessibility': return '♿';
      case 'security': return '🔒';
      case 'usability': return '👤';
      default: return '📋';
    }
  };

  const generateScoreChart = () => {
    if (!testResults.length) return null;

    const chartData = testResults.map(result => ({
      x: result.testType,
      y: result.score,
      label: `${result.score.toFixed(1)}%`
    }));

    return (
      <AdvancedChart
        type="bar"
        series={[{ name: 'Test Scores', data: chartData }]}
        title="QA Test Scores"
        yAxisLabel="Score (%)"
        height={300}
        showLegend={false}
      />
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'tests', label: 'Test Results', icon: '🧪' },
    { id: 'validation', label: 'Industry Validation', icon: '🏆' },
    { id: 'reports', label: 'Reports', icon: '📄' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Overall Status */}
            {qaReport && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Overall Quality Status
                  </h3>
                  <button
                    onClick={runAllTests}
                    disabled={isRunningTests}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      qaReport.overall.status === 'passed' ? 'text-green-600' :
                      qaReport.overall.status === 'warning' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {qaReport.overall.score.toFixed(1)}%
                    </div>
                    <div className="text-gray-600">Overall Score</div>
                  </div>

                  <div className="text-center">
                    <div className={`text-2xl mb-2 ${
                      qaReport.overall.status === 'passed' ? 'text-green-600' :
                      qaReport.overall.status === 'warning' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {qaReport.overall.status === 'passed' ? '✅' :
                       qaReport.overall.status === 'warning' ? '⚠️' : '❌'}
                    </div>
                    <div className="text-gray-600 capitalize">
                      {qaReport.overall.status}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {qaReport.testResults.length}
                    </div>
                    <div className="text-gray-600">Tests Run</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{qaReport.overall.summary}</p>
                </div>
              </div>
            )}

            {/* Test Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['accuracy', 'performance', 'accessibility', 'security'].map(testType => {
                const result = testResults.find(r => r.testType === testType);
                return (
                  <div key={testType} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getTestTypeIcon(testType as any)}</span>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {testType}
                        </h4>
                      </div>
                      <button
                        onClick={() => runSpecificTest(testType as any)}
                        disabled={isRunningTests}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Run
                      </button>
                    </div>

                    {result ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                          <span className="text-lg font-semibold text-gray-900">
                            {result.score.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Last run: {result.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <div className="text-sm">Not tested</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Score Chart */}
            {testResults.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Test Score Overview
                </h3>
                {generateScoreChart()}
              </div>
            )}
          </div>
        );

      case 'tests':
        return (
          <div className="space-y-4">
            {testResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🧪</div>
                <p>No test results available</p>
                <p className="text-sm">Run tests to see detailed results</p>
              </div>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTestTypeIcon(result.testType)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {result.testType} Test
                        </h3>
                        <p className="text-sm text-gray-600">
                          {result.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        {result.score.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Test Details */}
                  <div className="space-y-2">
                    {result.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className={`p-3 rounded-lg border-l-4 ${
                          detail.status === 'passed' ? 'bg-green-50 border-green-400' :
                          detail.status === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                          'bg-red-50 border-red-400'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">
                                {detail.test}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(detail.status)}`}>
                                {detail.status}
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {detail.severity} severity
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              {detail.message}
                            </p>
                            {detail.expected && detail.actual && (
                              <div className="mt-2 text-xs text-gray-600">
                                <div>Expected: {JSON.stringify(detail.expected)}</div>
                                <div>Actual: {JSON.stringify(detail.actual)}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'validation':
        return <IndustryValidationComponent calculatorId={calculatorId} />;

      case 'reports':
        return (
          <div className="space-y-6">
            {qaReport && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  QA Report Summary
                </h3>

                {/* Recommendations */}
                {qaReport.recommendations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                    <ul className="space-y-1">
                      {qaReport.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Next Steps */}
                {qaReport.nextSteps.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Next Steps:</h4>
                    <ol className="space-y-1">
                      {qaReport.nextSteps.map((step: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Export Options */}
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Export PDF Report
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Export Excel Report
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Export JSON Data
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Quality Assurance Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive testing and validation for calculator accuracy, performance, and compliance.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  );
};

export default QADashboard;