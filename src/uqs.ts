import { Tuid, Book, Map, Query, Action } from "tonva";

export interface UqWms {
    Warehouse: Tuid;
    WarehouseBuilding: Tuid;
    WarehouseRoom: Tuid;
    Shelf: Tuid;
    ShelfLayer: Tuid;
    ShelfBlock: History;
    GetWarehouseList: Query;

}

export interface UQs {
    warehouse: UqWms;
}
