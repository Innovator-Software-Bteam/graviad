export interface IQuery {
    where?: any;
    relations?: string[];
    order?: any;
    skip?: number;
    take?: number;
    limit?: number;
    page?: number;
    select?: any;
}