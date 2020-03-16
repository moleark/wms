import { Tuid, Book, Map, Query, Action } from "tonva";

export interface UqWms {
    Warehouse: Tuid;
    WarehouseBuilding: Tuid;
    WarehouseRoom: Tuid;
    Shelf: Tuid;
    ShelfLayer: Tuid;
    ShelfBlock: History;
    GetWarehouseList: Query;
    GetWarehouseByName: Query;
    GetWarehouseBuilding: Query;
    GetWarehouseRoom: Query;
    GetShelf: Query;
    GetShelfLayer: Query;
    GetShelfBlock: Query;
}

export interface UQs {
    warehouse: UqWms;
}
