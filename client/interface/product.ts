export interface ProductInterface {
    id?: string
    name: string
    review: {
        total?: number
        review_point: number
    }
    discount: number
    description: string
    brand: string
    price: number
    image_path: string
    create_date?: Date
}

export enum CategoryEnum {
    Chair = 'chair',
    Bed = 'bed',
    Table = 'table',
    Sofa = 'sofa',
    Wardrobe = 'wardrobe',
    Lamp = 'lamp',
}