/**
 * US States data for state selection
 */

export interface StateInfo {
  code: string;
  name: string;
  passingScore: number;
  questionCount: number;
  timeLimit: number; // in minutes
}

export const US_STATES: StateInfo[] = [
  { code: 'AL', name: 'Alabama', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'AK', name: 'Alaska', passingScore: 80, questionCount: 20, timeLimit: 30 },
  { code: 'AZ', name: 'Arizona', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'AR', name: 'Arkansas', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'CA', name: 'California', passingScore: 83, questionCount: 36, timeLimit: 45 },
  { code: 'CO', name: 'Colorado', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'CT', name: 'Connecticut', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'DE', name: 'Delaware', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'DC', name: 'District of Columbia', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'FL', name: 'Florida', passingScore: 80, questionCount: 50, timeLimit: 60 },
  { code: 'GA', name: 'Georgia', passingScore: 75, questionCount: 40, timeLimit: 45 },
  { code: 'HI', name: 'Hawaii', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'ID', name: 'Idaho', passingScore: 85, questionCount: 40, timeLimit: 45 },
  { code: 'IL', name: 'Illinois', passingScore: 80, questionCount: 35, timeLimit: 45 },
  { code: 'IN', name: 'Indiana', passingScore: 84, questionCount: 50, timeLimit: 60 },
  { code: 'IA', name: 'Iowa', passingScore: 80, questionCount: 35, timeLimit: 45 },
  { code: 'KS', name: 'Kansas', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'KY', name: 'Kentucky', passingScore: 80, questionCount: 40, timeLimit: 45 },
  { code: 'LA', name: 'Louisiana', passingScore: 80, questionCount: 40, timeLimit: 45 },
  { code: 'ME', name: 'Maine', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'MD', name: 'Maryland', passingScore: 85, questionCount: 25, timeLimit: 40 },
  { code: 'MA', name: 'Massachusetts', passingScore: 72, questionCount: 25, timeLimit: 40 },
  { code: 'MI', name: 'Michigan', passingScore: 80, questionCount: 50, timeLimit: 60 },
  { code: 'MN', name: 'Minnesota', passingScore: 80, questionCount: 40, timeLimit: 45 },
  { code: 'MS', name: 'Mississippi', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'MO', name: 'Missouri', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'MT', name: 'Montana', passingScore: 80, questionCount: 33, timeLimit: 45 },
  { code: 'NE', name: 'Nebraska', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'NV', name: 'Nevada', passingScore: 80, questionCount: 50, timeLimit: 60 },
  { code: 'NH', name: 'New Hampshire', passingScore: 80, questionCount: 40, timeLimit: 45 },
  { code: 'NJ', name: 'New Jersey', passingScore: 80, questionCount: 50, timeLimit: 60 },
  { code: 'NM', name: 'New Mexico', passingScore: 78, questionCount: 25, timeLimit: 40 },
  { code: 'NY', name: 'New York', passingScore: 70, questionCount: 20, timeLimit: 30 },
  { code: 'NC', name: 'North Carolina', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'ND', name: 'North Dakota', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'OH', name: 'Ohio', passingScore: 75, questionCount: 40, timeLimit: 45 },
  { code: 'OK', name: 'Oklahoma', passingScore: 80, questionCount: 50, timeLimit: 60 },
  { code: 'OR', name: 'Oregon', passingScore: 80, questionCount: 35, timeLimit: 45 },
  { code: 'PA', name: 'Pennsylvania', passingScore: 85, questionCount: 18, timeLimit: 30 },
  { code: 'RI', name: 'Rhode Island', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'SC', name: 'South Carolina', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'SD', name: 'South Dakota', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'TN', name: 'Tennessee', passingScore: 80, questionCount: 30, timeLimit: 45 },
  { code: 'TX', name: 'Texas', passingScore: 70, questionCount: 30, timeLimit: 45 },
  { code: 'UT', name: 'Utah', passingScore: 80, questionCount: 50, timeLimit: 60 },
  { code: 'VT', name: 'Vermont', passingScore: 80, questionCount: 20, timeLimit: 30 },
  { code: 'VA', name: 'Virginia', passingScore: 80, questionCount: 35, timeLimit: 45 },
  { code: 'WA', name: 'Washington', passingScore: 80, questionCount: 40, timeLimit: 45 },
  { code: 'WV', name: 'West Virginia', passingScore: 80, questionCount: 25, timeLimit: 40 },
  { code: 'WI', name: 'Wisconsin', passingScore: 80, questionCount: 50, timeLimit: 60 },
  { code: 'WY', name: 'Wyoming', passingScore: 80, questionCount: 25, timeLimit: 40 },
];

export const getStateByCode = (code: string): StateInfo | undefined => {
  return US_STATES.find(state => state.code === code);
};
