import * as React from 'react';
import { nav, VPage, Page, Prop, IconText, PropGrid } from 'tonva';
//import { Prop, IconText, FA, PropGrid, LMR } from 'tonva';
import { CSetting } from './CSetting';
//import { observer } from 'mobx-react';
//import { appConfig } from '../configuration';

export class VSetting extends VPage<CSetting> {

    async open() {
        this.openPage(this.page);
    }

    private openWarehouseList = async () => {

        this.controller.openWarehouseList();
    }

    /*
    private openShelfList = async () => {
        this.controller.openShelftList();
    }
    private openShelfLayerList = async () => {
        this.controller.openShelfLayerList();
    }
    private openShelfBlockList = async () => {
        this.controller.openShelfBlockList();
    }
    */

    public render() {
        return <this.page />;
    }

    private page = () => {

        const { user } = nav;
        let rows: Prop[];

        rows = [
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="库房管理" />,
                onClick: this.openWarehouseList
            }
        ]

        return <Page header="更多设置">
            <PropGrid rows={rows} values={{}} />
        </Page >;
    }

}


