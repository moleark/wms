import { Tuid, Book, Map, Query, Action } from "tonva";

export interface UqWarehouse {
    $user: Tuid;
    Warehouse: Tuid;
    WarehouseBuilding: Tuid;
    WarehouseRoom: Tuid;
    Shelf: Tuid;
    ShelfLayer: Tuid;
    ShelfBlock: Tuid;
    GetValidWarehouseList: Query;
    SearchWarehouseByKey: Query;
    SearchWarehouseBuilding: Query;
    SearchWarehouseRoom: Query;
    SearchShelf: Query;
    SearchShelfLayer: Query;
    SearchShelfBlock: Query;
    SearchReadyOutBoundCutTastList: Query;  // 查询待出库截单任务列表
    OutBoundCut: Action;                // 出库截单
    SearchOutBoundOrderList: Query;     // 查询出库单号列表
    SearchOutBoundOrderDetail: Query;   // 查询出库单详情

    StorageCondition: Tuid;
    WarehouseStorageCondition: Tuid;
    WarehouseStorageConditionMap: Map;

    WarehouseHazardClass: Tuid;
    HazardClass: Tuid;
    Hazard: Tuid;
    WarehouseHazardClassMap: Map;
    WarehouseHazardMap: Map;
}

export interface UQs {
    warehouse: UqWarehouse
}