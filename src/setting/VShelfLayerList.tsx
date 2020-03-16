
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VShelfLayerList extends VPage<CWarehouse> {

    private shelfLayers: any[];

    async open(shelfLayers?: any[]) {

        this.shelfLayers = shelfLayers;
        this.openPage(this.page);
    }

    private page = () => {
        let right =
            <div>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cog" icon="gear" text="" />
                </span>
            </div>;
        let footer = <button type="button" className="btn btn-primary w-100" >添加新货架层</button>;
        let warehouseBuildList = <List items={this.shelfLayers} item={{ render: this.onWarehouseRender }} none="无货架层" />;
        return <Page header="货架层列表" right={right} footer={footer}>
            {warehouseBuildList}
        </Page>;
    };

    private onWarehouseRender = (warehouseBuild: any) => {

        let { $id, name, no: number } = warehouseBuild;
        let { openShelfBlockList } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => openShelfBlockList($id)}>
            <div>
                {number},  {name}
            </div>
        </ LMR>
    };

}