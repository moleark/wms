import { Tuid, Book, Map, Query, Action } from "tonva";

export interface UqWarehouse {
    Warehouse: Tuid;
    WarehouseBuilding: Tuid;
    WarehouseRoom: Tuid;
    Shelf: Tuid;
    ShelfLayer: Tuid;
    ShelfBlock: Tuid;
    SearchWarehouseByKey: Query;
    SearchWarehouseBuilding: Query;
    SearchWarehouseRoom: Query;
    SearchShelf: Query;
    SearchShelfLayer: Query;
    SearchShelfBlock: Query;
    SearchReadyOutBoundCutTastList: Query;

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