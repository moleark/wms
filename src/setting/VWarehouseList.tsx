
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VWarehouseList extends VPage<CWarehouse> {

    private warehouses: any[];

    async open(warehouses?: any) {

        this.warehouses = warehouses;
        this.openPage(this.page);
    }

    private page = () => {
        let right =
            <div>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cog" icon="gear" text="" />
                </span>
            </div>;
        let footer = <button type="button" className="btn btn-primary w-100" >添加新库房</button>;
        let warehousetList = <List items={this.warehouses} item={{ render: this.onWarehouseRender }} none="无库房" />;
        return <Page header="库房列表" right={right} footer={footer}>
            {warehousetList}
        </Page>;
    };

    private onWarehouseRender = (warehouse: any) => {

        let { id, name, no } = warehouse;
        let { openWarehouseBuildingList } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" >
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => openWarehouseBuildingList(id)}>
            <div>
                {name}
            </div>
        </ LMR>
    }

}