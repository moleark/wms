import * as React from 'react';
import { Tuid, Query, PageItems, Map } from 'tonva';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { CUqBase } from '../CBase';
import { VWarehouseList } from './VWarehouseList';
import { VWarehouseBuildingList } from './VWarehouseBuildingList';
import { VWarehouseRoomList } from './VWarehouseRoomList';
import { VShelfList } from './VShelfList';
import { VShelfLayerList } from './VShelfLayerList';
import { VShelfBlockList } from './VShelfBlockList';

class PageWarehouse extends PageItems<any> {

    private searchWarehouse: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchWarehouse = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchWarehouse.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CWarehouse extends CUqBase {

    //    cApp: CApp;
    async internalStart(param: any) {

        //this.searchWarehouseByKey(param);
        let warehouseQResult = await this.getWarehouses();
        let warehouses: any[] = warehouseQResult;
        this.openVPage(VWarehouseList, warehouses);
    }

    /*
    searchWarehouseByKey = async (key: string) => {
        this.warehouse = new PageWarehouse(this.uqs.warehouse.GetWarehouseList);
        this.warehouse.first({ key: key });
    }
    */

    async getWarehouses(): Promise<any[]> {

        return await this.uqs.warehouse.Warehouse.all(); // GetWarehouseList.query({});
    }

    /*
    async getWarehouse(id: number): Promise<any[]> {
        return await this.uqs.warehouse.Warehouse.load(id);
        // await this.uqs.warehouse.Warehouse.loadArr();
    }
    */

    //库区管理界面
    openWarehouseBuildingList = async (id: number) => {

        let warehouseBuildsQuery = await this.uqs.warehouse.GetWarehouseBuilding.query({ warehouse: id });
        let warehouseBuilds: any[] = warehouseBuildsQuery.ret;
        this.openVPage(VWarehouseBuildingList, warehouseBuilds);
    };

    //房间管理界面
    openWarehouseRoomList = async (id: number) => {

        let warehouseRoomsQuery = await this.uqs.warehouse.GetWarehouseRoom.query({ warehouseBuilding: id });
        let warehouseRooms: any[] = warehouseRoomsQuery.ret;
        this.openVPage(VWarehouseRoomList, warehouseRooms);
    };

    //货架组管理界面
    openShelfList = async (id: number) => {

        let shelfsQuery = await this.uqs.warehouse.GetShelf.query({ warehouseRoom: id });
        let shelfs: any[] = shelfsQuery.ret;
        this.openVPage(VShelfList, shelfs);
    };

    //货架层管理界面
    openShelfLayerList = async (id: number) => {

        let shelfLayersQuery = await this.uqs.warehouse.GetShelfLayer.query({ shelf: id });
        let shelfLayers: any[] = shelfLayersQuery.ret;
        this.openVPage(VShelfLayerList, shelfLayers);
    };

    //货位管理界面
    openShelfBlockList = async (id: number) => {

        let shelfBlocksQuery = await this.uqs.warehouse.GetShelfBlock.query({ shelfLayer: id });
        let shelfBlocks: any[] = shelfBlocksQuery.ret;
        this.openVPage(VShelfBlockList, shelfBlocks);
    };

    render = observer(() => {
        return this.renderView(VWarehouseList);
    })

    tab = () => {
        return <this.render />;
    }
}