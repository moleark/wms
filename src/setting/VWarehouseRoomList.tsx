
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VWarehouseRoomList extends VPage<CWarehouse> {

    private warehouseRooms: any[];

    async open(warehouseRooms?: any[]) {

        this.warehouseRooms = warehouseRooms;
        this.openPage(this.page);
    }

    private page = () => {
        let right =
            <div>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cog" icon="gear" text="" />
                </span>
            </div>;
        let footer = <button type="button" className="btn btn-primary w-100" >添加新房间</button>;
        let warehouseRoomList = <List items={this.warehouseRooms} item={{ render: this.onWarehouseRender }} none="无房间" />;
        return <Page header="房间列表" right={right} footer={footer}>
            {warehouseRoomList}
        </Page>;
    };

    private onWarehouseRender = (warehouseRoom: any) => {

        let { $id, name, no: number } = warehouseRoom;
        let { openShelfList } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => openShelfList($id)}>
            <div>
                {number},  {name}
            </div>
        </ LMR>
    };

}