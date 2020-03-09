import * as React from 'react';
import { nav, VPage, CApp, Page, Prop, IconText, FA, PropGrid, LMR } from 'tonva';
//import { Prop, IconText, FA, PropGrid, LMR } from 'tonva';
import { CSetting } from './CSetting';
//import { appConfig } from '../configuration';
import { observer } from 'mobx-react';

export class VSetting extends VPage<CSetting> {

    async open(param?: any) {
        this.openPage(this.content);
    }

    private exit() {
        nav.showLogout();
    }

    private openWarehouseList = async () => {
        this.controller.openWarehouseList();
    }
    private openWarehouseBuildList = async () => {
        this.controller.opennWarehouseBuildList();
    }
    private openWarehouseRoomList = async () => {
        this.controller.openWarehouseRoomList();
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
        return <this.content />;
    }

    private openWarehouse = async () => {
        // this.controller.openWarehouse();
    }

    private content = observer(() => {

        //return <Page header="仓库设置"><div>123 当前显示设置界面</div></Page>

        const { user } = nav;

        let rows: Prop[];
        if (user !== undefined) {
            rows = [];
            rows.push(
                {
                    type: 'component',
                    component: <button className="btn btn-success w-100 my-2" onClick={() => nav.showLogin(undefined, true)}>
                        <FA name="sign-out" size="lg" /> 请登录
                    </button>
                },
            );
        }
        else {
            let logOutRows: Prop[] = [
                '',
                {
                    type: 'component',
                    bk: '',
                    component: <button className="btn btn-danger w-100" onClick={this.exit}>
                        <FA name="sign-out" size="lg" /> 退出登录
                </button>
                },
            ];

            rows = [
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="库房管理" />,
                    onClick: this.openWarehouseList
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="库区管理" />,
                    onClick: this.openWarehouseBuildList
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="address-book-o" text="房间管理" />,
                    onClick: this.openWarehouseRoomList
                }
                /*,
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="key" text="货架管理" />,
                    onClick: this.changePassword
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="key" text="货架层管理" />,
                    onClick: this.changePassword
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="key" text="货位管理" />,
                    onClick: this.changePassword
                }
                */
            ]
            rows.push(...logOutRows);
        }
        let right =
            <div onClick={() => this.controller.start()}>
                <span className="fa-stack">
                    <i className="fa fa-square fa-stack-2x text-primary"></i>
                    <i className="fa fa-cog fa-stack-1x text-white"></i>
                </span>
            </div>;
        return <Page header="仓库设置">
            <PropGrid rows={rows} values={{}} />
        </Page>;
    })

}



