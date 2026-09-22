export type ProductType = {
    id: string;
    type: string;
    name: string;
    price: number;
    originalPrice?: number;
    image?: string;
    tag?: string;
    description?: string;
    rating?: {
        rate: number;
        count: number;
    };
};
export type InstaType = {
    id: string;
    userName: string;
    content?: string;
};
export type TitleType = {
    title: string;
    iconUrl?: string;
    description?: string;
};
export type CategoryCardType = {
    id: string;
    iconUrl: string;
    categoryName: string;
    description?: string;
    categoryClass: string;
};
export type ReviewType = {
    rate: number;
    count?: number;
    countText?: string;
};
export type ReviewProcType = {
    product: string;
    rating: number;
    title: string;
    comment: string;
    userName: string;
};
export type CustomerFormType = {
    lastName: string;
    firstName: string;
    lastNameKana: string;
    firstNameKana: string;
    postalCode: string;
    prefecture: string;
    city: string;
    address: string;
    building: string;
    email: string;
    phone: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    gender: "male" | "female" | "";
    isMember: "yes" | "no";
    password: string;
    passwordConfirm: string;
    autoLogin: boolean;
};
