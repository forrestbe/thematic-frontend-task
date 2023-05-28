export interface SelectedFilter {
  name: string;
  type: string;
  score: 'Average' | 'NPS' | 'Threshold' | null;
}