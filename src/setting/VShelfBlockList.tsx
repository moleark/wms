
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VShelfBlockList extends VPage<CWarehouse> {

    private shelfBlocks: any[];

    async open(shelfBlocks?: any[]) {

        this.shelfBlocks = shelfBlocks;
        this.openPage(this.page);
    }

    private page = () => {
        let right =
            <div>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cog" icon="gear" text="" />
                </span>
            </div>;
        let footer = <button type="button" className="btn btn-primary w-100" >添加新货位</button>;
        let warehouseBuildList = <List items={this.shelfBlocks} item={{ render: this.onWarehouseRender }} none="无货位" />;
        return <Page header="货位列表" right={right} footer={footer}>
            {warehouseBuildList}
        </Page>;
    };

    private onWarehouseRender = (warehouseBuild: any) => {

        let { $id, name, no: number } = warehouseBuild;
        //let { openshelfList } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" >
            <div>
                {number},  {name}
            </div>
        </ LMR>
    };

}