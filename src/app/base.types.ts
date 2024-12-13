export interface BaseQueryParams {
    page?: number;            // Pagination: page number
    page_size?: number;       // Pagination: number of items per page
    created_by?: string;      // Filter by creator ID
    updated_by?: string;      // Filter by updater ID
    created_at?: string;      // Filter by creation date (ISO8601)
    updated_at?: string;      // Filter by update date (ISO8601)
}
