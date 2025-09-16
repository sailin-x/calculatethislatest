/**
 * Travel Calculator Formulas
 * Comprehensive travel planning and cost calculations
 */

/**
 * Calculate flight costs and comparisons
 */
export function calculateFlightCost(
  distance: number,
  classType: 'economy' | 'premium_economy' | 'business' | 'first' = 'economy',
  airlineType: 'budget' | 'traditional' | 'luxury' = 'traditional',
  routeType: 'domestic' | 'international' | 'transcontinental' = 'domestic'
): {
  baseCostPerMile: number;
  totalCost: number;
  costPerKm: number;
  classMultiplier: number;
  airlineMultiplier: number;
  routeMultiplier: number;
} {
  // Base cost per mile (approximate averages)
  const baseCosts = {
    domestic: 0.15,
    international: 0.25,
    transcontinental: 0.35
  };

  const baseCostPerMile = baseCosts[routeType];

  // Class multipliers
  const classMultipliers = {
    economy: 1.0,
    premium_economy: 1.8,
    business: 4.0,
    first: 8.0
  };

  // Airline type multipliers
  const airlineMultipliers = {
    budget: 0.7,
    traditional: 1.0,
    luxury: 1.5
  };

  // Route type multipliers
  const routeMultipliers = {
    domestic: 1.0,
    international: 1.3,
    transcontinental: 1.6
  };

  const totalCost = distance * baseCostPerMile *
                   classMultipliers[classType] *
                   airlineMultipliers[airlineType] *
                   routeMultipliers[routeType];

  return {
    baseCostPerMile,
    totalCost: Math.round(totalCost * 100) / 100,
    costPerKm: Math.round((totalCost / (distance * 1.609)) * 100) / 100,
    classMultiplier: classMultipliers[classType],
    airlineMultiplier: airlineMultipliers[airlineType],
    routeMultiplier: routeMultipliers[routeType]
  };
}

/**
 * Calculate hotel accommodation costs
 */
export function calculateHotelCost(
  nights: number,
  roomType: 'standard' | 'deluxe' | 'suite' | 'penthouse' = 'standard',
  location: 'budget' | 'moderate' | 'expensive' | 'luxury' = 'moderate',
  season: 'low' | 'shoulder' | 'high' | 'peak' = 'shoulder',
  amenities: string[] = []
): {
  nightlyRate: number;
  totalCost: number;
  amenitiesCost: number;
  taxesAndFees: number;
  grandTotal: number;
  costBreakdown: {
    room: number;
    amenities: number;
    taxes: number;
  };
} {
  // Base nightly rates by location
  const baseRates = {
    budget: { standard: 80, deluxe: 120, suite: 200, penthouse: 400 },
    moderate: { standard: 150, deluxe: 250, suite: 400, penthouse: 800 },
    expensive: { standard: 300, deluxe: 500, suite: 800, penthouse: 1500 },
    luxury: { standard: 500, deluxe: 800, suite: 1200, penthouse: 2500 }
  };

  // Seasonal multipliers
  const seasonalMultipliers = {
    low: 0.8,
    shoulder: 1.0,
    high: 1.3,
    peak: 1.6
  };

  const baseRate = baseRates[location][roomType];
  const seasonalRate = baseRate * seasonalMultipliers[season];

  // Calculate amenities cost
  const amenityCosts: Record<string, number> = {
    'wifi': 15,
    'parking': 25,
    'breakfast': 20,
    'spa': 50,
    'gym': 0, // Usually included
    'pool': 0, // Usually included
    'concierge': 0, // Usually included
    'room_service': 30,
    'minibar': 40,
    'laundry': 15
  };

  const amenitiesCost = amenities.reduce((total, amenity) =>
    total + (amenityCosts[amenity] || 0), 0);

  const roomCost = seasonalRate * nights;
  const totalBeforeTax = roomCost + amenitiesCost;
  const taxesAndFees = totalBeforeTax * 0.12; // 12% taxes and fees
  const grandTotal = totalBeforeTax + taxesAndFees;

  return {
    nightlyRate: Math.round(seasonalRate * 100) / 100,
    totalCost: Math.round(roomCost * 100) / 100,
    amenitiesCost: Math.round(amenitiesCost * 100) / 100,
    taxesAndFees: Math.round(taxesAndFees * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
    costBreakdown: {
      room: Math.round(roomCost * 100) / 100,
      amenities: Math.round(amenitiesCost * 100) / 100,
      taxes: Math.round(taxesAndFees * 100) / 100
    }
  };
}

/**
 * Calculate transportation costs within destination
 */
export function calculateLocalTransportation(
  days: number,
  transportationType: 'public' | 'taxi' | 'rideshare' | 'rental_car' | 'walking' = 'public',
  cityType: 'small' | 'medium' | 'large' | 'major_metro' = 'medium',
  usage: 'light' | 'moderate' | 'heavy' = 'moderate'
): {
  dailyCost: number;
  totalCost: number;
  transportationType: string;
  cityType: string;
  usage: string;
  costBreakdown: {
    base: number;
    fuel: number;
    fees: number;
  };
} {
  // Base daily costs by transportation type and city
  const baseCosts: Record<string, Record<string, number>> = {
    public: { small: 5, medium: 8, large: 12, major_metro: 15 },
    taxi: { small: 15, medium: 25, large: 35, major_metro: 45 },
    rideshare: { small: 12, medium: 20, large: 28, major_metro: 35 },
    rental_car: { small: 35, medium: 45, large: 55, major_metro: 65 },
    walking: { small: 0, medium: 0, large: 0, major_metro: 0 }
  };

  // Usage multipliers
  const usageMultipliers = {
    light: 0.7,
    moderate: 1.0,
    heavy: 1.4
  };

  const baseDailyCost = baseCosts[transportationType][cityType];
  const dailyCost = baseDailyCost * usageMultipliers[usage];
  const totalCost = dailyCost * days;

  // Breakdown for rental car
  let costBreakdown = {
    base: totalCost,
    fuel: 0,
    fees: 0
  };

  if (transportationType === 'rental_car') {
    costBreakdown = {
      base: totalCost * 0.6,
      fuel: totalCost * 0.3,
      fees: totalCost * 0.1
    };
  }

  return {
    dailyCost: Math.round(dailyCost * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    transportationType,
    cityType,
    usage,
    costBreakdown: {
      base: Math.round(costBreakdown.base * 100) / 100,
      fuel: Math.round(costBreakdown.fuel * 100) / 100,
      fees: Math.round(costBreakdown.fees * 100) / 100
    }
  };
}

/**
 * Calculate food and dining costs
 */
export function calculateFoodCost(
  days: number,
  mealPlan: 'budget' | 'moderate' | 'expensive' | 'luxury' = 'moderate',
  destination: 'domestic' | 'international' | 'exotic' = 'international',
  dietaryRestrictions: string[] = [],
  alcohol: 'none' | 'light' | 'moderate' | 'heavy' = 'light'
): {
  dailyCost: number;
  totalCost: number;
  mealsPerDay: number;
  costBreakdown: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacks: number;
    alcohol: number;
  };
  mealPlan: string;
  destination: string;
} {
  // Base meal costs by destination and plan
  const mealCosts: Record<string, Record<string, { breakfast: number; lunch: number; dinner: number; snacks: number }>> = {
    domestic: {
      budget: { breakfast: 8, lunch: 12, dinner: 20, snacks: 6 },
      moderate: { breakfast: 12, lunch: 18, dinner: 30, snacks: 9 },
      expensive: { breakfast: 18, lunch: 28, dinner: 45, snacks: 14 },
      luxury: { breakfast: 25, lunch: 40, dinner: 65, snacks: 20 }
    },
    international: {
      budget: { breakfast: 6, lunch: 10, dinner: 18, snacks: 5 },
      moderate: { breakfast: 10, lunch: 15, dinner: 25, snacks: 8 },
      expensive: { breakfast: 15, lunch: 25, dinner: 40, snacks: 12 },
      luxury: { breakfast: 20, lunch: 35, dinner: 55, snacks: 18 }
    },
    exotic: {
      budget: { breakfast: 5, lunch: 8, dinner: 15, snacks: 4 },
      moderate: { breakfast: 8, lunch: 12, dinner: 20, snacks: 6 },
      expensive: { breakfast: 12, lunch: 20, dinner: 35, snacks: 10 },
      luxury: { breakfast: 18, lunch: 30, dinner: 50, snacks: 15 }
    }
  };

  const baseCosts = mealCosts[destination][mealPlan];
  const dailyFoodCost = baseCosts.breakfast + baseCosts.lunch + baseCosts.dinner + baseCosts.snacks;

  // Alcohol costs
  const alcoholCosts = {
    none: 0,
    light: 8,
    moderate: 15,
    heavy: 25
  };

  const dailyAlcoholCost = alcoholCosts[alcohol];
  const dailyCost = dailyFoodCost + dailyAlcoholCost;
  const totalCost = dailyCost * days;

  // Dietary restriction adjustments
  let dietaryMultiplier = 1.0;
  if (dietaryRestrictions.includes('vegan') || dietaryRestrictions.includes('vegetarian')) {
    dietaryMultiplier *= 0.9; // Slightly cheaper
  }
  if (dietaryRestrictions.includes('gluten_free')) {
    dietaryMultiplier *= 1.2; // More expensive
  }
  if (dietaryRestrictions.includes('kosher') || dietaryRestrictions.includes('halal')) {
    dietaryMultiplier *= 1.1; // Slightly more expensive
  }

  const adjustedTotalCost = totalCost * dietaryMultiplier;

  return {
    dailyCost: Math.round(dailyCost * 100) / 100,
    totalCost: Math.round(adjustedTotalCost * 100) / 100,
    mealsPerDay: 3,
    costBreakdown: {
      breakfast: Math.round(baseCosts.breakfast * days * dietaryMultiplier * 100) / 100,
      lunch: Math.round(baseCosts.lunch * days * dietaryMultiplier * 100) / 100,
      dinner: Math.round(baseCosts.dinner * days * dietaryMultiplier * 100) / 100,
      snacks: Math.round(baseCosts.snacks * days * dietaryMultiplier * 100) / 100,
      alcohol: Math.round(dailyAlcoholCost * days * 100) / 100
    },
    mealPlan,
    destination
  };
}

/**
 * Calculate entertainment and activity costs
 */
export function calculateEntertainmentCost(
  days: number,
  activityLevel: 'low' | 'moderate' | 'high' | 'extreme' = 'moderate',
  destination: 'cultural' | 'adventure' | 'beach' | 'city' | 'nature' = 'city',
  groupSize: number = 2
): {
  dailyCost: number;
  totalCost: number;
  activitiesPerDay: number;
  costBreakdown: {
    attractions: number;
    tours: number;
    shows: number;
    miscellaneous: number;
  };
  activityLevel: string;
  destination: string;
} {
  // Base daily costs by destination and activity level
  const baseCosts: Record<string, Record<string, { attractions: number; tours: number; shows: number; misc: number }>> = {
    cultural: {
      low: { attractions: 20, tours: 15, shows: 10, misc: 10 },
      moderate: { attractions: 35, tours: 25, shows: 20, misc: 15 },
      high: { attractions: 55, tours: 40, shows: 35, misc: 25 },
      extreme: { attractions: 80, tours: 60, shows: 50, misc: 35 }
    },
    adventure: {
      low: { attractions: 25, tours: 20, shows: 5, misc: 15 },
      moderate: { attractions: 45, tours: 35, shows: 10, misc: 20 },
      high: { attractions: 70, tours: 55, shows: 15, misc: 30 },
      extreme: { attractions: 100, tours: 80, shows: 25, misc: 45 }
    },
    beach: {
      low: { attractions: 15, tours: 10, shows: 5, misc: 10 },
      moderate: { attractions: 25, tours: 20, shows: 10, misc: 15 },
      high: { attractions: 40, tours: 30, shows: 20, misc: 20 },
      extreme: { attractions: 60, tours: 45, shows: 30, misc: 30 }
    },
    city: {
      low: { attractions: 20, tours: 15, shows: 15, misc: 10 },
      moderate: { attractions: 35, tours: 25, shows: 25, misc: 15 },
      high: { attractions: 55, tours: 40, shows: 40, misc: 25 },
      extreme: { attractions: 80, tours: 60, shows: 60, misc: 35 }
    },
    nature: {
      low: { attractions: 15, tours: 20, shows: 5, misc: 10 },
      moderate: { attractions: 25, tours: 35, shows: 10, misc: 15 },
      high: { attractions: 40, tours: 55, shows: 15, misc: 20 },
      extreme: { attractions: 60, tours: 80, shows: 20, misc: 30 }
    }
  };

  const baseCostsForDestination = baseCosts[destination][activityLevel];
  const dailyCost = baseCostsForDestination.attractions +
                   baseCostsForDestination.tours +
                   baseCostsForDestination.shows +
                   baseCostsForDestination.misc;

  // Group size discount (for tours and some activities)
  const groupDiscount = groupSize > 2 ? 0.9 : 1.0;
  const adjustedDailyCost = dailyCost * groupDiscount;
  const totalCost = adjustedDailyCost * days;

  return {
    dailyCost: Math.round(adjustedDailyCost * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    activitiesPerDay: activityLevel === 'low' ? 2 : activityLevel === 'moderate' ? 3 :
                     activityLevel === 'high' ? 4 : 5,
    costBreakdown: {
      attractions: Math.round(baseCostsForDestination.attractions * days * groupDiscount * 100) / 100,
      tours: Math.round(baseCostsForDestination.tours * days * groupDiscount * 100) / 100,
      shows: Math.round(baseCostsForDestination.shows * days * groupDiscount * 100) / 100,
      miscellaneous: Math.round(baseCostsForDestination.misc * days * groupDiscount * 100) / 100
    },
    activityLevel,
    destination
  };
}

/**
 * Calculate miscellaneous travel expenses
 */
export function calculateMiscellaneousCosts(
  days: number,
  tripType: 'leisure' | 'business' | 'backpacking' | 'luxury' = 'leisure',
  destination: 'domestic' | 'international' | 'exotic' = 'international',
  shopping: 'minimal' | 'moderate' | 'heavy' = 'moderate'
): {
  dailyCost: number;
  totalCost: number;
  costBreakdown: {
    shopping: number;
    toiletries: number;
    laundry: number;
    tips: number;
    miscellaneous: number;
  };
  tripType: string;
  destination: string;
} {
  // Base daily costs by trip type and destination
  const baseCosts: Record<string, Record<string, { shopping: number; toiletries: number; laundry: number; tips: number; misc: number }>> = {
    leisure: {
      domestic: { shopping: 20, toiletries: 5, laundry: 8, tips: 10, misc: 15 },
      international: { shopping: 30, toiletries: 8, laundry: 12, tips: 15, misc: 20 },
      exotic: { shopping: 25, toiletries: 6, laundry: 10, tips: 12, misc: 18 }
    },
    business: {
      domestic: { shopping: 10, toiletries: 5, laundry: 8, tips: 15, misc: 20 },
      international: { shopping: 15, toiletries: 8, laundry: 12, tips: 20, misc: 25 },
      exotic: { shopping: 12, toiletries: 6, laundry: 10, tips: 18, misc: 22 }
    },
    backpacking: {
      domestic: { shopping: 8, toiletries: 3, laundry: 5, tips: 5, misc: 10 },
      international: { shopping: 12, toiletries: 5, laundry: 8, tips: 8, misc: 12 },
      exotic: { shopping: 10, toiletries: 4, laundry: 6, tips: 6, misc: 11 }
    },
    luxury: {
      domestic: { shopping: 50, toiletries: 15, laundry: 20, tips: 30, misc: 40 },
      international: { shopping: 75, toiletries: 20, laundry: 25, tips: 40, misc: 50 },
      exotic: { shopping: 60, toiletries: 18, laundry: 22, tips: 35, misc: 45 }
    }
  };

  const baseCostsForTrip = baseCosts[tripType][destination];

  // Adjust shopping based on preference
  const shoppingMultipliers = {
    minimal: 0.5,
    moderate: 1.0,
    heavy: 1.8
  };

  const adjustedShopping = baseCostsForTrip.shopping * shoppingMultipliers[shopping];
  const dailyCost = adjustedShopping + baseCostsForTrip.toiletries +
                   baseCostsForTrip.laundry + baseCostsForTrip.tips +
                   baseCostsForTrip.misc;

  const totalCost = dailyCost * days;

  return {
    dailyCost: Math.round(dailyCost * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    costBreakdown: {
      shopping: Math.round(adjustedShopping * days * 100) / 100,
      toiletries: Math.round(baseCostsForTrip.toiletries * days * 100) / 100,
      laundry: Math.round(baseCostsForTrip.laundry * days * 100) / 100,
      tips: Math.round(baseCostsForTrip.tips * days * 100) / 100,
      miscellaneous: Math.round(baseCostsForTrip.misc * days * 100) / 100
    },
    tripType,
    destination
  };
}

/**
 * Calculate total travel cost and provide budget analysis
 */
export function calculateTotalTravelCost(
  flightCost: number,
  hotelCost: number,
  transportationCost: number,
  foodCost: number,
  entertainmentCost: number,
  miscellaneousCost: number,
  travelers: number = 1,
  currency: string = 'USD'
): {
  totalCostPerPerson: number;
  totalCostForGroup: number;
  costBreakdown: {
    flight: number;
    hotel: number;
    transportation: number;
    food: number;
    entertainment: number;
    miscellaneous: number;
  };
  budgetCategory: string;
  dailyAverage: number;
  travelers: number;
  currency: string;
} {
  const totalCostForGroup = flightCost + hotelCost + transportationCost +
                           foodCost + entertainmentCost + miscellaneousCost;

  const totalCostPerPerson = totalCostForGroup / travelers;

  // Determine budget category
  let budgetCategory: string;
  if (totalCostPerPerson < 1000) {
    budgetCategory = 'Budget';
  } else if (totalCostPerPerson < 3000) {
    budgetCategory = 'Moderate';
  } else if (totalCostPerPerson < 5000) {
    budgetCategory = 'Expensive';
  } else {
    budgetCategory = 'Luxury';
  }

  return {
    totalCostPerPerson: Math.round(totalCostPerPerson * 100) / 100,
    totalCostForGroup: Math.round(totalCostForGroup * 100) / 100,
    costBreakdown: {
      flight: Math.round(flightCost * 100) / 100,
      hotel: Math.round(hotelCost * 100) / 100,
      transportation: Math.round(transportationCost * 100) / 100,
      food: Math.round(foodCost * 100) / 100,
      entertainment: Math.round(entertainmentCost * 100) / 100,
      miscellaneous: Math.round(miscellaneousCost * 100) / 100
    },
    budgetCategory,
    dailyAverage: 0, // Will be calculated if duration is provided
    travelers,
    currency
  };
}

/**
 * Calculate travel time and jet lag
 */
export function calculateTravelTime(
  departureTime: string,
  flightDuration: number,
  timeZoneDifference: number,
  layovers: number = 0,
  layoverTime: number = 0
): {
  totalTravelTime: number;
  arrivalTime: string;
  jetLagDays: number;
  jetLagSeverity: string;
  timeZoneDifference: number;
  recommendations: string[];
} {
  // Parse departure time (assuming HH:MM format)
  const [departureHour, departureMinute] = departureTime.split(':').map(Number);

  // Calculate total travel time in minutes
  const flightTimeMinutes = flightDuration * 60;
  const layoverTimeMinutes = layovers * layoverTime * 60;
  const totalTravelTimeMinutes = flightTimeMinutes + layoverTimeMinutes;

  // Calculate arrival time
  const departureMinutes = departureHour * 60 + departureMinute;
  const arrivalMinutes = (departureMinutes + totalTravelTimeMinutes) % (24 * 60);
  const arrivalHour = Math.floor(arrivalMinutes / 60);
  const arrivalMinute = arrivalMinutes % 60;
  const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;

  // Calculate jet lag
  const jetLagHours = Math.abs(timeZoneDifference);
  const jetLagDays = Math.ceil(jetLagHours / 3); // Roughly 3 hours per day of adjustment

  let jetLagSeverity: string;
  if (jetLagHours <= 3) {
    jetLagSeverity = 'Minimal';
  } else if (jetLagHours <= 6) {
    jetLagSeverity = 'Moderate';
  } else if (jetLagHours <= 9) {
    jetLagSeverity = 'Significant';
  } else {
    jetLagSeverity = 'Severe';
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (jetLagSeverity === 'Moderate' || jetLagSeverity === 'Significant' || jetLagSeverity === 'Severe') {
    recommendations.push('Consider melatonin or light therapy');
    recommendations.push('Stay hydrated during travel');
    recommendations.push('Adjust sleep schedule before departure');
  }
  if (layovers > 0) {
    recommendations.push('Allow extra time for layovers');
    recommendations.push('Have entertainment ready for layover time');
  }
  if (flightDuration > 8) {
    recommendations.push('Move around during long flights to prevent DVT');
    recommendations.push('Consider compression socks');
  }

  return {
    totalTravelTime: Math.round(totalTravelTimeMinutes / 60 * 100) / 100,
    arrivalTime,
    jetLagDays,
    jetLagSeverity,
    timeZoneDifference,
    recommendations
  };
}

/**
 * Main travel calculation function
 */
export function calculateTravel(inputs: any): any {
  const {
    calculationType,
    distance, classType, airlineType, routeType,
    nights, roomType, location, season, amenities,
    days, transportationType, cityType, usage,
    mealPlan, destination, dietaryRestrictions, alcohol,
    activityLevel, groupSize,
    tripType, shopping,
    flightCost, hotelCost, transportationCost, foodCost, entertainmentCost, miscellaneousCost, travelers, currency,
    departureTime, flightDuration, timeZoneDifference, layovers, layoverTime
  } = inputs;

  switch (calculationType) {
    case 'flight':
      return calculateFlightCost(distance, classType, airlineType, routeType);

    case 'hotel':
      return calculateHotelCost(nights, roomType, location, season, amenities);

    case 'transportation':
      return calculateLocalTransportation(days, transportationType, cityType, usage);

    case 'food':
      return calculateFoodCost(days, mealPlan, destination, dietaryRestrictions, alcohol);

    case 'entertainment':
      return calculateEntertainmentCost(days, activityLevel, destination, groupSize);

    case 'miscellaneous':
      return calculateMiscellaneousCosts(days, tripType, destination, shopping);

    case 'total_cost':
      return calculateTotalTravelCost(
        flightCost, hotelCost, transportationCost, foodCost,
        entertainmentCost, miscellaneousCost, travelers, currency
      );

    case 'travel_time':
      return calculateTravelTime(departureTime, flightDuration, timeZoneDifference, layovers, layoverTime);

    case 'comprehensive':
      // Calculate all components for a comprehensive travel budget
      const flight = calculateFlightCost(distance || 1000, classType || 'economy', airlineType || 'traditional', routeType || 'domestic');
      const hotel = calculateHotelCost(nights || 7, roomType || 'standard', location || 'moderate', season || 'shoulder', amenities || []);
      const transport = calculateLocalTransportation(days || 7, transportationType || 'public', cityType || 'medium', usage || 'moderate');
      const food = calculateFoodCost(days || 7, mealPlan || 'moderate', destination || 'international', dietaryRestrictions || [], alcohol || 'light');
      const entertainment = calculateEntertainmentCost(days || 7, activityLevel || 'moderate', destination || 'city', groupSize || 2);
      const misc = calculateMiscellaneousCosts(days || 7, tripType || 'leisure', destination || 'international', shopping || 'moderate');
      const total = calculateTotalTravelCost(
        flight.totalCost, hotel.grandTotal, transport.totalCost,
        food.totalCost, entertainment.totalCost, misc.totalCost,
        travelers || 1, currency || 'USD'
      );

      return {
        flight,
        hotel,
        transportation: transport,
        food,
        entertainment,
        miscellaneous: misc,
        total,
        summary: {
          totalEstimatedCost: total.totalCostForGroup,
          costPerPerson: total.totalCostPerPerson,
          budgetCategory: total.budgetCategory,
          majorCostCategory: Object.entries(total.costBreakdown)
            .sort(([,a], [,b]) => b - a)[0][0]
        }
      };

    default:
      throw new Error('Unknown travel calculation type');
  }
}