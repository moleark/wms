
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VWarehouseBuildingList extends VPage<CWarehouse> {

    private warehouseBuilds: any[];

    async open(warehouseBuilds?: any[]) {

        this.warehouseBuilds = warehouseBuilds;
        this.openPage(this.page);
    }

    private page = () => {
        let right =
            <div>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cog" icon="gear" text="" />
                </span>
            </div>;
        let footer = <button type="button" className="btn btn-primary w-100" >添加新库区</button>;
        let warehouseBuildList = <List items={this.warehouseBuilds} item={{ render: this.onWarehouseRender }} none="无库区" />;
        return <Page header="库区列表" right={right} footer={footer}>
            {warehouseBuildList}
        </Page>;
    };

    private onWarehouseRender = (warehouseBuild: any) => {

        let { $id, name, no: number } = warehouseBuild;
        let { openWarehouseRoomList } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => openWarehouseRoomList($id)}>
            <div>
                {number},  {name}
            </div>
        </ LMR>
    }

}