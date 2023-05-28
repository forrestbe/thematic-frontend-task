export interface SynopsisColumn {
  colType: string;
  numRows: number;
  numUniqueValues: number;
  sample: string[];
  sampleHeader: string;
}

export interface SynopsisResponse {
  columns: SynopsisColumn[];
  numColumns: number;
  numRows: number;
}