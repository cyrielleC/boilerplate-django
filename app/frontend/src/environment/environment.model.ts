export interface Environement {
    production: boolean;
    urls: {
        apiUrl: string;
        assetsUrl: string;
    };
    restaurantId: string;
}