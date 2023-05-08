export type ApiNeed = {
  id: string;
  title: string;
  description: string;
  category: string;
  address: {
    locality: string;
    province: string;
    zip: string;
    fullAddress: string;
  };
  source: string;
  sourceLink: string;
  extractionDate: string;
  extraData: Record<string, unknown>;
  relevanceScore: number;
};
