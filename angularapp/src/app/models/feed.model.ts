export interface Feed {
    _id?: string;
    feedName:string;
    type: string;
    description: string;
    unit: string;
    pricePerUnit: {
        $numberDecimal: string;
    };
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
