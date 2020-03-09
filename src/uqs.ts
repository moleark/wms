import { Tuid, Book, Map, Query, Action } from "tonva";

export interface UqWms {
    Warehouse: Tuid;
    ProductInventory: Book;
    SalesRegionWarehouse: Map;
    WarehouseBuilding: Tuid;
    WarehouseRoom: Tuid;
    Shelf: Tuid;
    ShelfLayer: Tuid;
    ShelfBlock: History;

}

export interface UQs {
    wms: UqWms;
}
