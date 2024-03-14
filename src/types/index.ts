type Breed = {
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  name: string;
  bredFor: string;
  lifeSpan: string;
  temperament: string;
  origin: string;
  referenceImageId: string;
};

export type Image = {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
};
