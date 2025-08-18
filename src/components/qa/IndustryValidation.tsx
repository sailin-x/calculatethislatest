import React, { useState, useEffect } from 'react';
import { QualityAssuranceService, IndustryValidation, ValidationFinding } from '../../services/QualityAssuranceService';

interface IndustryValidationProps {
  calculatorId: string;
  onValidationComplete?: (validation: IndustryValidation) => void;
}

export const IndustryValidationComponent: React.FC<IndustryValidationProps> = ({
  calculatorId,
  onValidationComplete
}) => {
  const [validations, setValidations] = useState<IndustryValidation[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newValidation, setNewValidation] = useState({
    industry: '',
    validator: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadValidations();
  }, [calculatorId]);

  const loadValidations = async () => {
    const validationData = await QualityAssuranceService.getValidationStatus(calculatorId);
    setValidations(validationData);
  };

  const requestValidation = async () => {
    if (!newValidation.industry || !newValidation.validator) return;

    setIsLoading(true);
    try {
      await QualityAssuranceService.requestIndustryValidation(
        calculatorId,
        newValidation.industry,
        newValidation.validator
      );
      
      await loadValidations();
      setShowRequestForm(false);
      setNewValidation({ industry: '', validator: '' });
    } catch (error) {
      console.error('Failed to request validation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: IndustryValidation['status']) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'conditional': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplianceLevelColor = (level: IndustryValidation['complianceLevel']) => {
    switch (level) {
      case 'enterprise': return 'text-purple-600 bg-purple-100';
      case 'professional': return 'text-blue-600 bg-blue-100';
      case 'standard': return 'text-green-600 bg-green-100';
      case 'basic': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: ValidationFinding['severity']) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const industryOptions = [
    'Financial Services',
    'Healthcare',
    'Legal',
    'Construction',
    'Real Estate',
    'Insurance',
    'Accounting',
    'Engineering',
    'Education',
    'Government'
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Industry Validation
        </h2>
        <button
          onClick={() => setShowRequestForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Request Validation
        </button>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Request Industry Validation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={newValidation.industry}
                  onChange={(e) => setNewValidation({ ...newValidation, industry: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Validator/Organization
                </label>
                <input
                  type="text"
                  value={newValidation.validator}
                  onChange={(e) => setNewValidation({ ...newValidation, validator: e.target.value })}
                  placeholder="e.g., CPA Institute, Bar Association"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowRequestForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={requestValidation}
                disabled={isLoading || !newValidation.industry || !newValidation.validator}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Requesting...' : 'Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validations List */}
      {validations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🏆</div>
          <p>No industry validations yet</p>
          <p className="text-sm">Request validation from industry professionals</p>
        </div>
      ) : (
        <div className="space-y-4">
          {validations.map((validation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {validation.industry} Validation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Validator: {validation.validator}
                  </p>
                  <p className="text-xs text-gray-500">
                    Requested: {validation.validationDate.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(validation.status)}`}>
                    {validation.status.charAt(0).toUpperCase() + validation.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceLevelColor(validation.complianceLevel)}`}>
                    {validation.complianceLevel.charAt(0).toUpperCase() + validation.complianceLevel.slice(1)}
                  </span>
                </div>
              </div>

              {/* Findings */}
              {validation.findings.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Findings:</h4>
                  <div className="space-y-2">
                    {validation.findings.map((finding, findingIndex) => (
                      <div
                        key={findingIndex}
                        className={`p-3 rounded-lg border-l-4 ${
                          finding.resolved 
                            ? 'bg-green-50 border-green-400' 
                            : finding.severity === 'critical' 
                            ? 'bg-red-50 border-red-400'
                            : finding.severity === 'high'
                            ? 'bg-orange-50 border-orange-400'
                            : 'bg-yellow-50 border-yellow-400'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-lg">
                            {finding.resolved ? '✅' : getSeverityIcon(finding.severity)}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm capitalize">
                                {finding.category}
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {finding.severity} severity
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">
                              {finding.description}
                            </p>
                            <p className="text-xs text-gray-600 italic">
                              Recommendation: {finding.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {validation.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                  <ul className="space-y-1">
                    {validation.recommendations.map((recommendation, recIndex) => (
                      <li key={recIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Status-specific content */}
              {validation.status === 'approved' && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-500 text-lg mr-2">✅</span>
                    <span className="text-green-800 font-medium">
                      Validation Approved - {validation.complianceLevel} level compliance
                    </span>
                  </div>
                </div>
              )}

              {validation.status === 'rejected' && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-500 text-lg mr-2">❌</span>
                    <span className="text-red-800 font-medium">
                      Validation Rejected - Please address findings and resubmit
                    </span>
                  </div>
                </div>
              )}

              {validation.status === 'conditional' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-blue-500 text-lg mr-2">⚠️</span>
                    <span className="text-blue-800 font-medium">
                      Conditional Approval - Address recommendations for full approval
                    </span>
                  </div>
                </div>
              )}

              {validation.status === 'pending' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg mr-2">⏳</span>
                    <span className="text-yellow-800 font-medium">
                      Validation in Progress - Awaiting review
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {validations.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Validation Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {validations.filter(v => v.status === 'approved').length}
              </div>
              <div className="text-gray-600">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-yellow-600">
                {validations.filter(v => v.status === 'pending').length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {validations.filter(v => v.status === 'conditional').length}
              </div>
              <div className="text-gray-600">Conditional</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-red-600">
                {validations.filter(v => v.status === 'rejected').length}
              </div>
              <div className="text-gray-600">Rejected</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryValidationComponent;