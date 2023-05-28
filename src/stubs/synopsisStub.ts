import { SynopsisResponse } from "../model/synopsis";

const synopsisStub: SynopsisResponse = {
  columns: [
    {
      colType: "Text", 
      numRows: 94465, 
      numUniqueValues: 5, 
      sample: [
        "Southwest Airlines", 
        "American Airlines", 
        "airline_name", 
        "United Airlines", 
        "Delta Air Lines"
      ], 
      sampleHeader: "airline_name"
    }, 
  ],
  numColumns: 12,
  numRows: 12
};

export { synopsisStub }