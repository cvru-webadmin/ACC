import { getPagination } from "./pagination.utiles";

export async function paginatePrisma<T>({
    model,
    page = 1,
    limit = 10,
    where = {},
    args = {},
    orderBy = { id: 'asc' },
}:{
    model: any;
    page?: number;
    limit?: number;
    where?: any;
    args?: any;
    orderBy?: any;
}): Promise<{
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}> {
     const {skip, take} = getPagination(page, limit);
     const [data, total] = await Promise.all([
        model.findMany({
            where,
            orderBy,
            skip,
            take,
            ...args,
        }),
        model.count({ where }),
     ]);
     const totalPages = Math.ceil(total / limit);
     return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages,
        },
     };
};