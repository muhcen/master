export interface Query {
    take: number;
    skip: number;
    order?: object;
    select?: [];
}
