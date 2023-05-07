export class CreateNeedDto {
  title: string;
  description: string;
  category: string;
  keywords: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}
