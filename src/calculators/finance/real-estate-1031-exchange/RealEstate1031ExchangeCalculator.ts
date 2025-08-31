import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RealEstate1031ExchangeInputs, RealEstate1031ExchangeOutputs } from './types';
import { calculateRealEstate1031Exchange } from './formulas';
import { validateRealEstate1031ExchangeInputs } from './validation';
import { validateField } from './quickValidation';

interface RealEstate1031ExchangeCalculatorProps {
  onCalculate?: (results: RealEstate1031ExchangeOutputs) => void;
  initialInputs?: Partial<RealEstate1031ExchangeInputs>;
}

export function RealEstate1031ExchangeCalculator({ 
  onCalculate, 
  initialInputs 
}: RealEstate1031ExchangeCalculatorProps) {
  const [inputs, setInputs] = useState<RealEstate1031ExchangeInputs>({
    // Relinquished Property Information
    relinquishedPropertyValue: 500000,
    relinquishedPropertyBasis: 300000,
    relinquishedPropertyDebt: 200000,
    relinquishedPropertyAcquisitionDate: '',
    relinquishedPropertySaleDate: '',
    relinquishedPropertySalePrice: 500000,
    relinquishedPropertySellingCosts: 25000,
    
    // Replacement Property Information
    replacementPropertyValue: 600000,
    replacementPropertyBasis: 600000,
    replacementPropertyDebt: 240000,
    replacementPropertyAcquisitionDate: '',
    replacementPropertyAcquisitionCosts: 30000,
    
    // Exchange Information
    exchangeType: 'delayed',
    identificationPeriod: 45,
    exchangePeriod: 180,
    qualifiedIntermediary: true,
    exchangeFees: 5000,
    
    // Boot Information
    cashBoot: 0,
    mortgageBoot: 0,
    personalPropertyBoot: 0,
    otherBoot: 0,
    
    // Tax Information
    taxRate: 25,
    stateTaxRate: 5,
    depreciationRecaptureRate: 25,
    
    // Additional Information
    likeKindRequirement: true,
    investmentIntent: true,
    holdingPeriod: 3,
    relatedPartyTransaction: false,
    
    // Reporting Preferences
    includeDetailedAnalysis: true,
    includeTimeline: true,
    includeTaxForms: true,
    currency: 'USD',
    displayFormat: 'currency',
    ...initialInputs
  });

  const [results, setResults] = useState<RealEstate1031ExchangeOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate cross-field validations
  useEffect(() => {
    const newErrors = { ...errors };
    
    // Auto-calculate net sale proceeds
    if (inputs.relinquishedPropertySalePrice > 0 && inputs.relinquishedPropertySellingCosts > 0) {
      const netProceeds = inputs.relinquishedPropertySalePrice - inputs.relinquishedPropertySellingCosts;
      if (netProceeds < inputs.relinquishedPropertyDebt) {
        newErrors.relinquishedPropertySalePrice = 'Net proceeds must be sufficient to pay off debt';
      } else {
        delete newErrors.relinquishedPropertySalePrice;
      }
    }
    
    // Validate exchange periods
    if (inputs.identificationPeriod > 45) {
      newErrors.identificationPeriod = 'Identification period cannot exceed 45 days';
    } else {
      delete newErrors.identificationPeriod;
    }
    
    if (inputs.exchangePeriod > 180) {
      newErrors.exchangePeriod = 'Exchange period cannot exceed 180 days';
    } else {
      delete newErrors.exchangePeriod;
    }
    
    setErrors(newErrors);
  }, [inputs.relinquishedPropertySalePrice, inputs.relinquishedPropertySellingCosts, inputs.relinquishedPropertyDebt, inputs.identificationPeriod, inputs.exchangePeriod]);

  const handleInputChange = (field: keyof RealEstate1031ExchangeInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || 'Invalid value' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});

    try {
      // Full validation
      const validation = validateRealEstate1031ExchangeInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const calculatedResults = calculateRealEstate1031Exchange(inputs);
      setResults(calculatedResults);
      
      if (onCalculate) {
        onCalculate(calculatedResults);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation. Please check your inputs.' });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatDecimal = (value: number) => {
    return value.toFixed(2);
  };

  const getExchangeTypeColor = (type: string) => {
    switch (type) {
      case 'simultaneous': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-blue-100 text-blue-800';
      case 'reverse': return 'bg-purple-100 text-purple-800';
      case 'build-to-suit': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Real Estate 1031 Exchange Calculator</span>
            <Badge variant="secondary">1031 Exchange</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="boot">Boot Analysis</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Relinquished Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Relinquished Property</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="relinquishedPropertyValue">Property Value</Label>
                      <Input
                        id="relinquishedPropertyValue"
                        type="number"
                        value={inputs.relinquishedPropertyValue}
                        onChange={(e) => handleInputChange('relinquishedPropertyValue', parseFloat(e.target.value) || 0)}
                        placeholder="500000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="relinquishedPropertyBasis">Adjusted Basis</Label>
                      <Input
                        id="relinquishedPropertyBasis"
                        type="number"
                        value={inputs.relinquishedPropertyBasis}
                        onChange={(e) => handleInputChange('relinquishedPropertyBasis', parseFloat(e.target.value) || 0)}
                        placeholder="300000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="relinquishedPropertyDebt">Outstanding Debt</Label>
                      <Input
                        id="relinquishedPropertyDebt"
                        type="number"
                        value={inputs.relinquishedPropertyDebt}
                        onChange={(e) => handleInputChange('relinquishedPropertyDebt', parseFloat(e.target.value) || 0)}
                        placeholder="200000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="relinquishedPropertyAcquisitionDate">Acquisition Date</Label>
                        <Input
                          id="relinquishedPropertyAcquisitionDate"
                          type="date"
                          value={inputs.relinquishedPropertyAcquisitionDate}
                          onChange={(e) => handleInputChange('relinquishedPropertyAcquisitionDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="relinquishedPropertySaleDate">Sale Date</Label>
                        <Input
                          id="relinquishedPropertySaleDate"
                          type="date"
                          value={inputs.relinquishedPropertySaleDate}
                          onChange={(e) => handleInputChange('relinquishedPropertySaleDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="relinquishedPropertySalePrice">Sale Price</Label>
                      <Input
                        id="relinquishedPropertySalePrice"
                        type="number"
                        value={inputs.relinquishedPropertySalePrice}
                        onChange={(e) => handleInputChange('relinquishedPropertySalePrice', parseFloat(e.target.value) || 0)}
                        placeholder="500000"
                      />
                      {errors.relinquishedPropertySalePrice && <p className="text-red-500 text-sm">{errors.relinquishedPropertySalePrice}</p>}
                    </div>

                    <div>
                      <Label htmlFor="relinquishedPropertySellingCosts">Selling Costs</Label>
                      <Input
                        id="relinquishedPropertySellingCosts"
                        type="number"
                        value={inputs.relinquishedPropertySellingCosts}
                        onChange={(e) => handleInputChange('relinquishedPropertySellingCosts', parseFloat(e.target.value) || 0)}
                        placeholder="25000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Replacement Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Replacement Property</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="replacementPropertyValue">Property Value</Label>
                      <Input
                        id="replacementPropertyValue"
                        type="number"
                        value={inputs.replacementPropertyValue}
                        onChange={(e) => handleInputChange('replacementPropertyValue', parseFloat(e.target.value) || 0)}
                        placeholder="600000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="replacementPropertyBasis">Purchase Price</Label>
                      <Input
                        id="replacementPropertyBasis"
                        type="number"
                        value={inputs.replacementPropertyBasis}
                        onChange={(e) => handleInputChange('replacementPropertyBasis', parseFloat(e.target.value) || 0)}
                        placeholder="600000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="replacementPropertyDebt">New Debt</Label>
                      <Input
                        id="replacementPropertyDebt"
                        type="number"
                        value={inputs.replacementPropertyDebt}
                        onChange={(e) => handleInputChange('replacementPropertyDebt', parseFloat(e.target.value) || 0)}
                        placeholder="240000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="replacementPropertyAcquisitionDate">Acquisition Date</Label>
                      <Input
                        id="replacementPropertyAcquisitionDate"
                        type="date"
                        value={inputs.replacementPropertyAcquisitionDate}
                        onChange={(e) => handleInputChange('replacementPropertyAcquisitionDate', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="replacementPropertyAcquisitionCosts">Acquisition Costs</Label>
                      <Input
                        id="replacementPropertyAcquisitionCosts"
                        type="number"
                        value={inputs.replacementPropertyAcquisitionCosts}
                        onChange={(e) => handleInputChange('replacementPropertyAcquisitionCosts', parseFloat(e.target.value) || 0)}
                        placeholder="30000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Exchange Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exchange Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="exchangeType">Exchange Type</Label>
                      <Select value={inputs.exchangeType} onValueChange={(value) => handleInputChange('exchangeType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simultaneous">Simultaneous</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                          <SelectItem value="reverse">Reverse</SelectItem>
                          <SelectItem value="build-to-suit">Build-to-Suit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="identificationPeriod">Identification Period (Days)</Label>
                        <Input
                          id="identificationPeriod"
                          type="number"
                          value={inputs.identificationPeriod}
                          onChange={(e) => handleInputChange('identificationPeriod', parseInt(e.target.value) || 0)}
                          placeholder="45"
                        />
                        {errors.identificationPeriod && <p className="text-red-500 text-sm">{errors.identificationPeriod}</p>}
                      </div>
                      <div>
                        <Label htmlFor="exchangePeriod">Exchange Period (Days)</Label>
                        <Input
                          id="exchangePeriod"
                          type="number"
                          value={inputs.exchangePeriod}
                          onChange={(e) => handleInputChange('exchangePeriod', parseInt(e.target.value) || 0)}
                          placeholder="180"
                        />
                        {errors.exchangePeriod && <p className="text-red-500 text-sm">{errors.exchangePeriod}</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="qualifiedIntermediary"
                        checked={inputs.qualifiedIntermediary}
                        onCheckedChange={(checked) => handleInputChange('qualifiedIntermediary', checked)}
                      />
                      <Label htmlFor="qualifiedIntermediary">Using Qualified Intermediary</Label>
                    </div>

                    <div>
                      <Label htmlFor="exchangeFees">Exchange Fees</Label>
                      <Input
                        id="exchangeFees"
                        type="number"
                        value={inputs.exchangeFees}
                        onChange={(e) => handleInputChange('exchangeFees', parseFloat(e.target.value) || 0)}
                        placeholder="5000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Boot Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Boot Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cashBoot">Cash Boot Received</Label>
                      <Input
                        id="cashBoot"
                        type="number"
                        value={inputs.cashBoot}
                        onChange={(e) => handleInputChange('cashBoot', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mortgageBoot">Mortgage Boot Received</Label>
                      <Input
                        id="mortgageBoot"
                        type="number"
                        value={inputs.mortgageBoot}
                        onChange={(e) => handleInputChange('mortgageBoot', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="personalPropertyBoot">Personal Property Boot</Label>
                      <Input
                        id="personalPropertyBoot"
                        type="number"
                        value={inputs.personalPropertyBoot}
                        onChange={(e) => handleInputChange('personalPropertyBoot', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="otherBoot">Other Boot</Label>
                      <Input
                        id="otherBoot"
                        type="number"
                        value={inputs.otherBoot}
                        onChange={(e) => handleInputChange('otherBoot', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Tax Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tax Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="taxRate">Federal Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        value={inputs.taxRate}
                        onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <Label htmlFor="stateTaxRate">State Tax Rate (%)</Label>
                      <Input
                        id="stateTaxRate"
                        type="number"
                        value={inputs.stateTaxRate}
                        onChange={(e) => handleInputChange('stateTaxRate', parseFloat(e.target.value) || 0)}
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="depreciationRecaptureRate">Depreciation Recapture Rate (%)</Label>
                      <Input
                        id="depreciationRecaptureRate"
                        type="number"
                        value={inputs.depreciationRecaptureRate}
                        onChange={(e) => handleInputChange('depreciationRecaptureRate', parseFloat(e.target.value) || 0)}
                        placeholder="25"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="likeKindRequirement"
                        checked={inputs.likeKindRequirement}
                        onCheckedChange={(checked) => handleInputChange('likeKindRequirement', checked)}
                      />
                      <Label htmlFor="likeKindRequirement">Like-Kind Property</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="investmentIntent"
                        checked={inputs.investmentIntent}
                        onCheckedChange={(checked) => handleInputChange('investmentIntent', checked)}
                      />
                      <Label htmlFor="investmentIntent">Investment Intent</Label>
                    </div>

                    <div>
                      <Label htmlFor="holdingPeriod">Holding Period (Years)</Label>
                      <Input
                        id="holdingPeriod"
                        type="number"
                        value={inputs.holdingPeriod}
                        onChange={(e) => handleInputChange('holdingPeriod', parseFloat(e.target.value) || 0)}
                        placeholder="3"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="relatedPartyTransaction"
                        checked={inputs.relatedPartyTransaction}
                        onCheckedChange={(checked) => handleInputChange('relatedPartyTransaction', checked)}
                      />
                      <Label htmlFor="relatedPartyTransaction">Related Party Transaction</Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={handleCalculate} 
                  disabled={isCalculating || Object.keys(errors).length > 0}
                  className="w-full max-w-md"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate 1031 Exchange'}
                </Button>
              </div>

              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see results.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Exchange Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Exchange Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(results.metrics.deferredGain)}
                          </div>
                          <div className="text-sm text-gray-600">Deferred Gain</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(results.metrics.taxSavings)}
                          </div>
                          <div className="text-sm text-gray-600">Tax Savings</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatCurrency(results.metrics.recognizedGain)}
                          </div>
                          <div className="text-sm text-gray-600">Recognized Gain</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatCurrency(results.metrics.netBoot)}
                          </div>
                          <div className="text-sm text-gray-600">Net Boot</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Property Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Property Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {formatCurrency(results.metrics.equityReplacement)}
                          </div>
                          <div className="text-sm text-gray-600">Equity Replacement</div>
                        </div>
                        <div className="text-center p-4 bg-pink-50 rounded-lg">
                          <div className="text-2xl font-bold text-pink-600">
                            {formatCurrency(results.metrics.debtReplacement)}
                          </div>
                          <div className="text-sm text-gray-600">Debt Replacement</div>
                        </div>
                        <div className="text-center p-4 bg-cyan-50 rounded-lg">
                          <div className="text-2xl font-bold text-cyan-600">
                            {formatPercentage(results.metrics.exchangeRatio)}
                          </div>
                          <div className="text-sm text-gray-600">Exchange Ratio</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Compliance Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Qualified Exchange:</span>
                          <Badge className={results.metrics.isQualified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {results.metrics.isQualified ? 'QUALIFIED' : 'NOT QUALIFIED'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Qualification Percentage:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={results.metrics.qualificationPercentage} className="w-32" />
                            <span>{results.metrics.qualificationPercentage.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="font-semibold">Compliance Issues:</span>
                          <ul className="list-disc list-inside space-y-1">
                            {results.metrics.complianceIssues.map((issue, index) => (
                              <li key={index} className="text-sm text-gray-600">{issue}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see timeline.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Exchange Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Exchange Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.timeline.map((event, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{event.event}</h4>
                              <Badge className={getStatusColor(event.status)}>
                                {event.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Date: </span>
                                <span>{event.date}</span>
                              </div>
                              <div>
                                <span className="font-medium">Deadline: </span>
                                <span>{event.deadline}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                            {event.requirements.length > 0 && (
                              <div className="mt-2">
                                <span className="font-medium text-sm">Requirements:</span>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                  {event.requirements.map((requirement, reqIndex) => (
                                    <li key={reqIndex}>{requirement}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="boot" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see boot analysis.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Boot Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Boot Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Taxable</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Tax Rate</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Tax Liability</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.bootAnalysis.map((boot, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{boot.type}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(boot.amount)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                  <Badge className={boot.taxable ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                                    {boot.taxable ? 'Yes' : 'No'}
                                  </Badge>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(boot.taxRate)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(boot.taxLiability)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see compliance analysis.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Compliance Checks */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance Checks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.complianceChecks.map((check, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{check.requirement}</h4>
                              <Badge className={
                                check.status === 'pass' ? 'bg-green-100 text-green-800' : 
                                check.status === 'fail' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {check.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{check.description}</p>
                            <p className="text-sm font-medium mb-2">Impact: {check.impact}</p>
                            <p className="text-sm text-blue-600">{check.recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see analysis.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Risk Level:</span>
                          <Badge className={
                            results.analysis.riskLevel === 'low' ? 'bg-green-100 text-green-800' : 
                            results.analysis.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }>
                            {results.analysis.riskLevel.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <span className="font-semibold">Risk Factors:</span>
                          <ul className="list-disc list-inside space-y-1">
                            {results.analysis.riskFactors.map((factor, index) => (
                              <li key={index} className="text-sm text-gray-600">{factor}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Benefits */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.keyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">→</span>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}