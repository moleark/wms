import { Tuid, Book, Map, Query, Action } from "tonva";

export interface UqWms {
    Warehouse: Tuid;
    WarehouseBuilding: Tuid;
    WarehouseRoom: Tuid;
    Shelf: Tuid;
    ShelfLayer: Tuid;
    ShelfBlock: History;
    SearchWarehouseByKey: Query;
    SearchWarehouseBuilding: Query;
    SearchWarehouseRoom: Query;
    SearchShelf: Query;
    SearchShelfLayer: Query;
    SearchShelfBlock: Query;
}

export interface UQs {
    warehouse: UqWms;
}
