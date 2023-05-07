export class Need {
  public source = 'app';

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly keywords: string[],
    public readonly coordinates: {
      latitude: number;
      longitude: number;
    },
    public readonly address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    },
    public readonly extractionDate: Date,
    public readonly updatedAt: Date,
  ) {}

  serialize() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      keywords: this.keywords,
      coordinates: this.coordinates,
      address: this.address,
      extractionDate: this.extractionDate,
      updatedAt: this.updatedAt,
      source: this.source,
    };
  }
}

export type SerializedNeed = ReturnType<Need['serialize']>;
