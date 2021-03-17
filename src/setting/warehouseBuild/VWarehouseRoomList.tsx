
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VWarehouseRoomList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private renderWarehouseRoom = (warehouseRoom: any) => {

        let { name } = warehouseRoom;
        let { searchShelfByKey, editWarehouseRoom } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="home" />
        </div>
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => editWarehouseRoom(warehouseRoom)}>
            <FA name="edit" />
        </div>
        return <LMR left={left} right={right} className="px-2 py-2" >
            <div className="px-1 py-1" onClick={() => searchShelfByKey(warehouseRoom)}>
                {name}
            </div>
        </ LMR>
    };

    private page = () => {

        let { currentWarehouse, warehouseRooms, searchWarehouseRoomByKey, newWarehouseRoom } = this.controller;
        let { name: warehouseName } = currentWarehouse;

        let header = <header>
            <div className="px-0"><span>{warehouseName}房间管理</span></div>
        </header>;
        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchWarehouseRoomByKey(currentWarehouse, key)}
                placeholder="请输入房间名称" />
        </div>;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => newWarehouseRoom()}>添加新房间</button>;
        let warehouseRoomList = <List items={warehouseRooms} item={{ render: this.renderWarehouseRoom }} none="无房间" />;

        return <Page header={header} right={right} footer={footer}>
            {warehouseRoomList}
        </Page>;
    };
}