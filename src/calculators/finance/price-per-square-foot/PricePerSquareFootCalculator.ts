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
import { PricePerSquareFootInputs, PricePerSquareFootOutputs } from './types';
import { calculatePricePerSquareFoot } from './formulas';
import { validatePricePerSquareFootInputs } from './validation';
import { validateField } from './quickValidation';

interface PricePerSquareFootCalculatorProps {
  onCalculate?: (results: PricePerSquareFootOutputs) => void;
  initialInputs?: Partial<PricePerSquareFootInputs>;
}

export function PricePerSquareFootCalculator({ onCalculate, initialInputs }: PricePerSquareFootCalculatorProps) {
  const [inputs, setInputs] = useState<PricePerSquareFootInputs>({
    // Property Information
    propertyAddress: '',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    numberOfUnits: 1,
    numberOfBedrooms: 3,
    numberOfBathrooms: 2,
    
    // Price Information
    propertyPrice: 400000,
    listPrice: 420000,
    salePrice: 0,
    appraisalValue: 410000,
    assessedValue: 380000,
    
    // Comparable Properties
    comparableProperties: [
      {
        address: '123 Main St',
        salePrice: 395000,
        size: 1950,
        age: 12,
        bedrooms: 3,
        bathrooms: 2,
        saleDate: '2023-12-01',
        condition: 'good',
        location: 'same neighborhood',
        adjustments: 0
      },
      {
        address: '456 Oak Ave',
        salePrice: 425000,
        size: 2100,
        age: 18,
        bedrooms: 3,
        bathrooms: 2.5,
        saleDate: '2023-11-15',
        condition: 'excellent',
        location: 'same neighborhood',
        adjustments: 0
      }
    ],
    
    // Market Information
    marketLocation: 'San Francisco, CA',
    marketCondition: 'growing',
    marketGrowthRate: 5.2,
    daysOnMarket: 45,
    
    // Property Features
    propertyCondition: 'good',
    propertyStyle: 'traditional',
    lotSize: 5000,
    garageSpaces: 2,
    parkingSpaces: 4,
    
    // Amenities and Features
    amenities: [
      { amenity: 'Pool', value: 15000, included: true },
      { amenity: 'Garden', value: 8000, included: true },
      { amenity: 'Solar Panels', value: 25000, included: false }
    ],
    
    // Location Factors
    schoolDistrict: 'San Francisco Unified',
    schoolRating: 8.5,
    crimeRate: 'low',
    walkScore: 85,
    transitScore: 90,
    bikeScore: 80,
    
    // Analysis Parameters
    analysisPeriod: 60,
    inflationRate: 2.5,
    propertyAppreciationRate: 3.0,
    discountRate: 5.0,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    ...initialInputs
  });

  const [results, setResults] = useState<PricePerSquareFootOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof PricePerSquareFootInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
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
      const validation = validatePricePerSquareFootInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const calculatedResults = calculatePricePerSquareFoot(inputs);
      setResults(calculatedResults);
      
      if (onCalculate) {
        onCalculate(calculatedResults);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation' });
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

  const formatNumber = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const getPriceRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Average': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-orange-100 text-orange-800';
      case 'Very Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getValueRatingColor = (rating: string) => {
    switch (rating) {
      case 'High Value': return 'bg-green-100 text-green-800';
      case 'Good Value': return 'bg-blue-100 text-blue-800';
      case 'Fair Value': return 'bg-yellow-100 text-yellow-800';
      case 'Low Value': return 'bg-orange-100 text-orange-800';
      case 'Overpriced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Price Per Square Foot Calculator</span>
            <Badge variant="secondary">Real Estate</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              {/* Property Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Input
                      id="propertyAddress"
                      value={inputs.propertyAddress}
                      onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                      placeholder="Enter property address"
                    />
                    {errors.propertyAddress && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.propertyAddress}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single_family">Single Family</SelectItem>
                        <SelectItem value="multi_family">Multi-Family</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="mixed_use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                    <Input
                      id="propertySize"
                      type="number"
                      value={inputs.propertySize}
                      onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value))}
                      placeholder="2000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyAge">Property Age (years)</Label>
                    <Input
                      id="propertyAge"
                      type="number"
                      value={inputs.propertyAge}
                      onChange={(e) => handleInputChange('propertyAge', parseInt(e.target.value))}
                      placeholder="15"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfBedrooms">Number of Bedrooms</Label>
                    <Input
                      id="numberOfBedrooms"
                      type="number"
                      value={inputs.numberOfBedrooms}
                      onChange={(e) => handleInputChange('numberOfBedrooms', parseInt(e.target.value))}
                      placeholder="3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfBathrooms">Number of Bathrooms</Label>
                    <Input
                      id="numberOfBathrooms"
                      type="number"
                      value={inputs.numberOfBathrooms}
                      onChange={(e) => handleInputChange('numberOfBathrooms', parseFloat(e.target.value))}
                      placeholder="2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Price Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyPrice">Property Price</Label>
                    <Input
                      id="propertyPrice"
                      type="number"
                      value={inputs.propertyPrice}
                      onChange={(e) => handleInputChange('propertyPrice', parseFloat(e.target.value))}
                      placeholder="400000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="listPrice">List Price</Label>
                    <Input
                      id="listPrice"
                      type="number"
                      value={inputs.listPrice}
                      onChange={(e) => handleInputChange('listPrice', parseFloat(e.target.value))}
                      placeholder="420000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appraisalValue">Appraisal Value</Label>
                    <Input
                      id="appraisalValue"
                      type="number"
                      value={inputs.appraisalValue}
                      onChange={(e) => handleInputChange('appraisalValue', parseFloat(e.target.value))}
                      placeholder="410000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assessedValue">Assessed Value</Label>
                    <Input
                      id="assessedValue"
                      type="number"
                      value={inputs.assessedValue}
                      onChange={(e) => handleInputChange('assessedValue', parseFloat(e.target.value))}
                      placeholder="380000"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Market Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marketLocation">Market Location</Label>
                    <Input
                      id="marketLocation"
                      value={inputs.marketLocation}
                      onChange={(e) => handleInputChange('marketLocation', e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marketCondition">Market Condition</Label>
                    <Select value={inputs.marketCondition} onValueChange={(value) => handleInputChange('marketCondition', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="declining">Declining</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="growing">Growing</SelectItem>
                        <SelectItem value="hot">Hot Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marketGrowthRate">Market Growth Rate (%)</Label>
                    <Input
                      id="marketGrowthRate"
                      type="number"
                      value={inputs.marketGrowthRate}
                      onChange={(e) => handleInputChange('marketGrowthRate', parseFloat(e.target.value))}
                      placeholder="5.2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daysOnMarket">Days on Market</Label>
                    <Input
                      id="daysOnMarket"
                      type="number"
                      value={inputs.daysOnMarket}
                      onChange={(e) => handleInputChange('daysOnMarket', parseInt(e.target.value))}
                      placeholder="45"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleCalculate} 
                disabled={isCalculating}
                className="w-full"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Price Per Square Foot'}
              </Button>

              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <>
                  {/* Core Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Core Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.pricePerSquareFoot)}
                        </div>
                        <div className="text-sm text-gray-600">Price Per Sq Ft</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.averageComparablePrice)}
                        </div>
                        <div className="text-sm text-gray-600">Avg Comparable</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.estimatedValue)}
                        </div>
                        <div className="text-sm text-gray-600">Estimated Value</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${results.overUnderPricedPercentage > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {formatNumber(results.overUnderPricedPercentage)}%
                        </div>
                        <div className="text-sm text-gray-600">Over/Under Priced</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Price Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Price Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Price Rating</Label>
                          <Badge className={`mt-1 ${getPriceRatingColor(results.analysis.priceRating)}`}>
                            {results.analysis.priceRating}
                          </Badge>
                        </div>
                        
                        <div>
                          <Label>Value Rating</Label>
                          <Badge className={`mt-1 ${getValueRatingColor(results.analysis.valueRating)}`}>
                            {results.analysis.valueRating}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Price Position</Label>
                        <div className="mt-1 text-lg font-semibold">{results.pricePosition}</div>
                      </div>
                      
                      <div>
                        <Label>Risk Score</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Risk Level</span>
                            <span>{results.riskScore}/100</span>
                          </div>
                          <Progress value={results.riskScore} className="w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>List Price Per Sq Ft:</span>
                          <span className="font-semibold">{formatCurrency(results.listPricePerSquareFoot)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sale Price Per Sq Ft:</span>
                          <span className="font-semibold">{formatCurrency(results.salePricePerSquareFoot)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Appraisal Price Per Sq Ft:</span>
                          <span className="font-semibold">{formatCurrency(results.appraisalPricePerSquareFoot)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Assessed Price Per Sq Ft:</span>
                          <span className="font-semibold">{formatCurrency(results.assessedPricePerSquareFoot)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Market Average Price:</span>
                          <span className="font-semibold">{formatCurrency(results.marketAveragePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Median Price:</span>
                          <span className="font-semibold">{formatCurrency(results.marketMedianPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price Percentile:</span>
                          <span className="font-semibold">{formatNumber(results.pricePercentile)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price Performance:</span>
                          <span className="font-semibold">{formatNumber(results.pricePerformance)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">Calculate price per square foot to see results</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results ? (
                <>
                  {/* Executive Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Executive Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-lg font-semibold mb-2">Price Rating</div>
                          <Badge className={getPriceRatingColor(results.analysis.priceRating)}>
                            {results.analysis.priceRating}
                          </Badge>
                        </div>
                        
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-lg font-semibold mb-2">Value Rating</div>
                          <Badge className={getValueRatingColor(results.analysis.valueRating)}>
                            {results.analysis.valueRating}
                          </Badge>
                        </div>
                        
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-lg font-semibold mb-2">Recommendation</div>
                          <Badge variant="outline">
                            {results.analysis.recommendation}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Insights */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">Key Strengths</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="text-sm">{strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Key Weaknesses</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="text-sm">{weakness}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">Value Factors</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.valueFactors.map((factor, index) => (
                            <li key={index} className="text-sm">{factor}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Price Summary</h4>
                        <p className="text-sm text-gray-700">{results.analysis.priceSummary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Market Analysis</h4>
                        <p className="text-sm text-gray-700">{results.analysis.marketAnalysis}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Value Analysis</h4>
                        <p className="text-sm text-gray-700">{results.analysis.valueAnalysis}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Location Analysis</h4>
                        <p className="text-sm text-gray-700">{results.analysis.locationSummary}</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">Calculate price per square foot to see analysis</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              {results ? (
                <>
                  {/* Comparison Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Comparison Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.comparisonAnalysis.map((comparison, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold">{comparison.metric}</span>
                              <Badge variant={comparison.percentage > 0 ? 'destructive' : 'default'}>
                                {formatNumber(comparison.percentage)}%
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Property:</span>
                                <span className="ml-2 font-semibold">{formatNumber(comparison.property)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Comparable:</span>
                                <span className="ml-2 font-semibold">{formatNumber(comparison.comparable)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Difference:</span>
                                <span className="ml-2 font-semibold">{formatNumber(comparison.difference)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Benchmark Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Benchmark Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.benchmarkAnalysis.map((benchmark, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold">{benchmark.metric}</span>
                              <Badge variant="outline">
                                {formatNumber(benchmark.percentile)}th percentile
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Property:</span>
                                <span className="ml-2 font-semibold">{formatNumber(benchmark.property)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Benchmark:</span>
                                <span className="ml-2 font-semibold">{formatNumber(benchmark.benchmark)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Difference:</span>
                                <span className="ml-2 font-semibold">{formatNumber(benchmark.difference)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">Calculate price per square foot to see comparison</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}