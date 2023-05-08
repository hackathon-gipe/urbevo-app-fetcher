export class Need {
  public source = 'app';

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly address: {
      city: string;
      state: string;
      zip: string;
      full_address: string;
    },
    public readonly extraData: string,
    public readonly extractionDate: Date,
    public readonly updatedAt: Date,
    public readonly relevanceScore?: number,
    public readonly sourceLink?: string,
    public readonly coordinates?: {
      latitude: number;
      longitude: number;
    },
  ) {}

  serialize() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      coordinates: this.coordinates,
      address: this.address,
      extractionDate: this.extractionDate,
      updatedAt: this.updatedAt,
      source: this.source,
      extraData: this.extraData,
      relevanceScore: this.relevanceScore,
      sourceLink: this.sourceLink,
    };
  }
}

export type SerializedNeed = ReturnType<Need['serialize']>;
