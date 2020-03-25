
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VWarehouseRoomList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private page = () => {

        let { warehouseRooms, searchWarehouseRoomByKey, currentWarehouseBuild } = this.controller;

        let header = <header>
            <div className="px-0">房间查询</div>
        </header>;

        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchWarehouseRoomByKey(currentWarehouseBuild, key)}
                placeholder="请输入房间名称" />
        </div>;

        let footer = <button type="button" className="btn btn-primary w-100">添加新房间</button>;
        let warehouseRoomList = <List items={warehouseRooms} item={{ render: this.onWarehouseRender }} none="无房间" />;
        return <Page header={header} right={right} footer={footer}>
            {warehouseRoomList}
        </Page>;
    };

    private onWarehouseRender = (warehouseRoom: any) => {

        let { id, name, no: number } = warehouseRoom;
        let { searchShelfByKey } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => searchShelfByKey(id)}>
            <div>
                {number}: {name}
            </div>
        </ LMR>
    };

}