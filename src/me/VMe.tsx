import * as React from 'react';
import { nav, VPage, Page, Prop, IconText, FA, PropGrid, Image, LMR } from 'tonva';
//import { Prop, IconText, FA, PropGrid, LMR } from 'tonva';
import { CMe } from './CMe';
import { observer } from 'mobx-react';
import { VSetting } from 'setting/VSetting';
//import { appConfig } from '../configuration';

export class VMe extends VPage<CMe> {

    async open(param?: any) {
        //this.openPage(this.page);
    }

    private exit() {
        nav.showLogout();
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

    private meInfo = observer(() => {
        let { user } = nav;
        if (user === undefined) return null;
        let { id, name, nick, icon } = user;
        return <LMR className="py-2 cursor-pointer w-100"
            left={<Image className="w-3c h-3c mr-3" src={icon} />}
            right={<FA className="align-self-end" name="reorder" />}
            onClick={() => {
                this.controller.openSettingPage();
            }}>
            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">ID:</span> {id > 10000 ? id : String(id + 10000).substr(1)}</div>
            </div>
        </LMR>;
    });

    public render() {
        return <this.page />;
    }

    private page = () => {

        const { user } = nav;
        let rows: Prop[];
        if (user === undefined) {
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
                    component: <this.meInfo />
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="institution" text="入库管理" />,
                    onClick: this.openWarehouseList
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="key" text="入库管理" />,
                    onClick: this.openWarehouseList
                },

            ]
            rows.push(...logOutRows);
        }

        /*<IconText iconClass="fa fa-cogs" icon="gears" text="更多设置" />*/
        let right =
            <div onClick={() => this.controller.openSettingPage()}>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cogs" icon="ellipsis-h" text="更多设置" />
                </span>
            </div>;

        return <PropGrid rows={rows} values={{}} />;
    }

}

function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}



