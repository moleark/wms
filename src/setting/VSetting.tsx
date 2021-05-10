import * as React from 'react';
import { VPage, Page, Prop, IconText, PropGrid } from 'tonva';
//import { Prop, IconText, FA, PropGrid, LMR } from 'tonva';
import { CSetting } from './index';
//import { observer } from 'mobx-react';
//import { appConfig } from '../configuration';

export class VSetting extends VPage<CSetting> {

    async open() {
        this.openPage(this.page);
    }

    // 打开库房模型管理
    private openWarehouseList = async () => {

        this.controller.openWarehouseList();
    }

    // 打开存储条件管理
    private openStorageConditionList = async () => {

        this.controller.openStorageConditionList();
    }

    public render() {
        return <this.page />;
    }

    private page = () => {

        let rows: Prop[];
        rows = [
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="university" text="库房模型配置" />,
                onClick: this.openWarehouseList
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="thermometer-half" text="存储条件管理" />,
                onClick: this.openStorageConditionList
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="warning" text="危险类别管理" />,
                onClick: null
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="cubes" text="包装代码管理" />,
                onClick: null
            },
            /*
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="房间-存储条件关系设置" />,
                onClick: null
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="房间-危险类别关系设置" />,
                onClick: null
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="货架层-包装代码关系设置" />,
                onClick: null
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="存储条件对应关系设置" />,
                onClick: null
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="危险类别对应关系设置" />,
                onClick: null
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="JK包装瓶-包装代码关系设置" />,
                onClick: null
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="institution" text="代理品牌-包装代码关系设置" />,
                onClick: null
            },
            */
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="info-circle" text="关于" />,
                onClick: null
            },
            
        ]

        return <Page header="设置">
            <PropGrid rows={rows} values={{}} />
        </Page >;
    }
}