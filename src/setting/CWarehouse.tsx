import * as React from 'react';
import { observer } from 'mobx-react';
import { CUqBase } from '../CBase';
import { VWarehouseList } from './VWarehouseList';
import { VWarehouseBuildingList } from './VWarehouseBuildingList';
import { VWarehouseRoomList } from './VWarehouseRoomList';
import { VShelfList } from './VShelfList';
import { VShelfLayerList } from './VShelfLayerList';
import { VShelfBlockList } from './VShelfBlockList';

export class CWarehouse extends CUqBase {

    warehouses: any[];
    currentWarehouse: string;
    warehouseBuilds: any[];
    currentWarehouseBuild: string;
    warehouseRooms: any[];
    currentWarehouseRoom: string;
    shelfs: any[];
    currentShelf: string;
    shelfLayers: any[];
    currentShelfLayer: string;
    shelfBlocks: any[];

    async internalStart(param: any) {

        await this.searchWarehouseByKey(param);
        this.openVPage(VWarehouseList);
    }

    /*
    async getWarehouses(): Promise<any[]> {
        return await this.uqs.warehouse.Warehouse.all(); // GetWarehouseList.query({});
    };
    async getWarehouse(id: number): Promise<any[]> {
        return await this.uqs.warehouse.Warehouse.load(id);
        // await this.uqs.warehouse.Warehouse.loadArr();
    }
    */

    // 查询库房
    searchWarehouseByKey = async (key: String) => {

        let warehouseList = await this.uqs.warehouse.SearchWarehouseByKey.query({ key: key });
        this.warehouses = warehouseList.ret;
        this.openVPage(VWarehouseList);
    };

    // 库区管理界面 查询库区
    searchWarehouseBuildByKey = async (warehouse: string, key?: String) => {

        this.currentWarehouse = warehouse;
        let warehouseBuildList = await this.uqs.warehouse.SearchWarehouseBuilding.query({ warehouse: warehouse, key: key });
        this.warehouseBuilds = warehouseBuildList.ret;
        this.openVPage(VWarehouseBuildingList);
    };

    // 房间管理界面 查询房间
    searchWarehouseRoomByKey = async (warehouseBuild: string, key?: String) => {

        this.currentWarehouseBuild = warehouseBuild;
        let warehouseRoomList = await this.uqs.warehouse.SearchWarehouseRoom.query({ warehouseBuilding: warehouseBuild, key: key });
        this.warehouseRooms = warehouseRoomList.ret;
        this.openVPage(VWarehouseRoomList);
    };

    //货架组管理界面 查询货架
    searchShelfByKey = async (warehouseRoom: string, key?: String) => {

        this.currentWarehouseRoom = warehouseRoom;
        let shelfList = await this.uqs.warehouse.SearchShelf.query({ warehouseRoom: warehouseRoom, key: key });
        this.shelfs = shelfList.ret;
        this.openVPage(VShelfList);
    };

    //货架层管理界面 查询货架层
    searchShelfLayerByKey = async (shelf: string, key?: String) => {

        this.currentShelf = shelf;
        let shelfLayerList = await this.uqs.warehouse.SearchShelfLayer.query({ shelf: shelf, key: key });
        this.shelfLayers = shelfLayerList.ret;
        this.openVPage(VShelfLayerList);
    };

    //货位管理界面 查询货位号
    searchShelfBlockByKey = async (shelfLayer: string, key?: String) => {

        this.currentShelfLayer = shelfLayer;
        let shelfBlockList = await this.uqs.warehouse.SearchShelfBlock.query({ shelfLayer: shelfLayer, key: key });
        this.shelfBlocks = shelfBlockList.ret;
        this.openVPage(VShelfBlockList);
    };

    render = observer(() => {
        return this.renderView(VWarehouseList);
    })

    tab = () => {
        return <this.render />;
    }
}