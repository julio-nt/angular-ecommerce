export type ProductApiModel = {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductModel = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: [
    {
      rating: number;
      comment: string;
      date: Date;
      reviewerName: string;
      reviewerEmail: string;
    },
    {
      rating: number;
      comment: string;
      date: Date;
      reviewerName: string;
      reviewerEmail: string;
    },
    {
      rating: number;
      comment: string;
      date: Date;
      reviewerName: string;
      reviewerEmail: string;
    }
  ];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: Date;
    updatedAt: Date;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: [string, string, string];
};
