export type invoiceStatsData = {
    stats : {
        totalRevenue: number;
        paidAmount: number;
        pendingAmount: number;
        overdueAmount: number;
    }
}