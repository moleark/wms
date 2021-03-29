import * as React from 'react';
import { observer } from 'mobx-react';
import { CUqBase } from '../../CBase';
import { VWarehouseList } from './VWarehouseList';
import { VWarehouse } from './VWarehouse';
import { VWarehouseBuildingList } from './VWarehouseBuildingList';
import { VWarehouseBuilding } from './VWarehouseBuilding';
import { VWarehouseRoomList } from './VWarehouseRoomList';
import { VWarehouseRoom } from './VWarehouseRoom';
import { VShelfList } from './VShelfList';
import { VShelf } from './VShelf';
import { VShelfLayerList } from './VShelfLayerList';
import { VShelfLayer } from './VShelfLayer';
import { VShelfBlockList } from './VShelfBlockList';
import { VShelfBlock } from './VShelfBlock';

export class CWarehouse extends CUqBase {

    warehouses: any[];
    currentWarehouse: any;
    warehouseBuilds: any[];
    currentWarehouseBuild: any;
    warehouseRooms: any[];
    currentWarehouseRoom: any;
    shelfs: any[];
    currentShelf: any;
    shelfLayers: any[];
    currentShelfLayer: any;
    shelfBlocks: any[];

    async internalStart(param: any) {

        await this.searchWarehouseByKey(param);
    }

    /**
     * 查询库房
     * @param key 
     */
    searchWarehouseByKey = async (key: String) => {

        this.warehouses = await this.uqs.warehouse.SearchWarehouseByKey.table({ key: key });
        this.openVPage(VWarehouseList);
    };

    /**
     * 打开库房新建界面
     */
    newWarehouse = async () => {
        this.openVPage(VWarehouse);
    }

    /**
     * 打开库房编辑界面
    */
    editWarehouse = async (warehouse: any) => {

        this.openVPage(VWarehouse, warehouse);
    }

    /**
     * 修改库房信息
     * @param warehouse
     */
    saveWarehouse = async (warehouseId: any, warehouse: any) => {

        let { Warehouse: warehouseTuid } = this.uqs.warehouse;
        await warehouseTuid.save(warehouseId, warehouse);

        this.closePage(2);
        this.searchWarehouseByKey('');
    }

    /**
     * 查询库区
     * @param warehouse
     * @param key
     */
    searchWarehouseBuildByKey = async (warehouse: any, key?: String) => {

        this.currentWarehouse = warehouse;
        this.warehouseBuilds = await this.uqs.warehouse.SearchWarehouseBuilding.table({ warehouse: warehouse, key: key });
        this.openVPage(VWarehouseBuildingList);
    };

    /**
     * 打开新建库区界面
     */
    newWarehouseBuilding = async () => {

        this.openVPage(VWarehouseBuilding);
    }

    /**
     * 打开编辑库区界面
    */
    editWarehouseBuilding = async (warehouseBuilding: any) => {

        this.openVPage(VWarehouseBuilding, warehouseBuilding);
    }

    /**
     * 修改库区信息
     * @param warehouse
     */
    saveWarehouseBuilding = async (warehouseBuildId: any, warehouseBuild: any) => {

        let { WarehouseBuilding: WarehouseBuildingTuid } = this.uqs.warehouse;
        await WarehouseBuildingTuid.save(warehouseBuildId, warehouseBuild);

        //this.backPage();
        this.closePage(2);
        this.searchWarehouseBuildByKey(this.currentWarehouse, '');
    }

    /**
     * 查询房间
     * @param warehouseBuild
     * @param key 
     */
    searchWarehouseRoomByKey = async (warehouse: any, key?: String) => {

        this.currentWarehouse = warehouse;
        this.warehouseRooms = await this.uqs.warehouse.SearchWarehouseRoom.table({ warehouse: warehouse, key: key });
        this.openVPage(VWarehouseRoomList);
    };

    /**
     * 打开新建房间界面
     */
    newWarehouseRoom = async () => {

        this.openVPage(VWarehouseRoom);
    }

    /**
     * 打开编辑房间界面
    */
    editWarehouseRoom = async (warehouseRoom: any) => {

        this.openVPage(VWarehouseRoom, warehouseRoom);
    }

    /**
     * 修改房间信息
     * @param warehouse
     */
    saveWarehouseRoom = async (warehouseRoomId: any, warehouseRoom: any) => {

        let { WarehouseRoom: WarehouseRoomTuid } = this.uqs.warehouse;
        await WarehouseRoomTuid.save(warehouseRoomId, warehouseRoom);

        //this.backPage();
        this.closePage(2);
        this.searchWarehouseRoomByKey(this.currentWarehouseBuild, '');
    }


    /**
     *  查询货架组
     * @param warehouseRoom 
     * @param key 
     */
    searchShelfByKey = async (warehouseRoom: any, key?: String) => {

        this.currentWarehouseRoom = warehouseRoom;
        this.shelfs = await this.uqs.warehouse.SearchShelf.table({ warehouseRoom: warehouseRoom, key: key });
        this.openVPage(VShelfList);
    };

    /**
     * 打开新建货架组界面
     */
    newShelf = async () => {

        this.openVPage(VShelf);
    }

    /**
     * 打开编辑货架组界面
    */
    editShelf = async (shelf: any) => {

        this.openVPage(VShelf, shelf);
    }

    /**
     * 修改货架组信息
     * @param warehouse
     */
    saveShelf = async (shelfId: any, shelf: any) => {

        let { Shelf: shelfTuid } = this.uqs.warehouse;
        await shelfTuid.save(shelfId, shelf);

        //this.backPage();
        this.closePage(2);
        this.searchShelfByKey(this.currentWarehouseRoom, '');
    }


    /**
     * 查询货架层
     * @param shelf 
     * @param key 
     */
    searchShelfLayerByKey = async (shelf: string, key?: String) => {

        this.currentShelf = shelf;
        this.shelfLayers = await this.uqs.warehouse.SearchShelfLayer.table({ shelf: shelf, key: key });
        this.openVPage(VShelfLayerList);
    };

    /**
     * 打开新建货架层界面
     */
    newShelfLayer = async () => {

        this.openVPage(VShelfLayer);
    }

    /**
     * 打开编辑货架层界面
    */
    editShelfLayer = async (shelfLayer: any) => {

        this.openVPage(VShelfLayer, shelfLayer);
    }

    /**
     * 修改货架层信息
     * @param warehouse
     */
    saveShelfLayer = async (shelfLayerId: any, shelfLayer: any) => {

        let { ShelfLayer: shelfLayerTuid } = this.uqs.warehouse;
        await shelfLayerTuid.save(shelfLayerId, shelfLayer);

        // this.backPage();
        this.closePage(2);
        this.searchShelfLayerByKey(this.currentShelf, '');
    }

    /**
     * 查询货位号
     * @param shelfLayer 
     * @param key 
     */
    searchShelfBlockByKey = async (shelfLayer: string, key?: String) => {

        this.currentShelfLayer = shelfLayer;
        this.shelfBlocks = await this.uqs.warehouse.SearchShelfBlock.table({ shelfLayer: shelfLayer, key: key });
        this.openVPage(VShelfBlockList);
    };

    /**
     * 打开新建货位界面
     */
    newShelfBlock = async () => {

        this.openVPage(VShelfBlock);
    }

    /**
     * 打开编辑货位界面
    */
    editShelfBlock = async (shelfLayer: any) => {

        this.openVPage(VShelfBlock, shelfLayer);
    }

    /**
     * 修改货位信息
     * @param warehouse
     */
    saveShelfblock = async (shelfBlockId: any, shelfBlock: any) => {

        let { ShelfBlock: shelfBlockTuid } = this.uqs.warehouse;
        await shelfBlockTuid.save(shelfBlockId, shelfBlock);

        // this.backPage();
        this.closePage(2);
        this.searchShelfBlockByKey(this.currentShelfLayer, '');
    }

    render = observer(() => {
        return this.renderView(VWarehouseList);
    })

    tab = () => {
        return <this.render />;
    }
}