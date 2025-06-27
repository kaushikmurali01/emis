export interface FacilityData {
  name: string;
  type: string;
  location: string;
  size: number;
  hasExistingEMIS: boolean;
  existingEMISType?: string;
  energyConsumption: number;
  primaryEnergySource: string;
  buildingAge: number;
  occupancy: number;
}

export interface ScoringCriteria {
  id: string;
  category: string;
  subcategory: string;
  description: string;
  maxScore: number;
  weight: number;
  applicableToExisting: boolean;
  applicableToNew: boolean;
}

export interface ScoreEntry {
  criteriaId: string;
  score: number;
  notes?: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  weight: number;
  weightedScore: number;
}

export interface ScoringResults {
  totalScore: number;
  maxTotalScore: number;
  overallPercentage: number;
  categoryScores: CategoryScore[];
  recommendations: Recommendation[];
  scoreEntries: ScoreEntry[];
}

export interface Recommendation {
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  title: string;
  description: string;
  estimatedCost: string;
  timeframe: string;
  expectedBenefit: string;
}