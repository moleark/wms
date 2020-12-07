import * as React from 'react';
import { nav, VPage, Prop, IconText, FA, PropGrid, Image, LMR } from 'tonva';
//import { Prop, IconText, FA, PropGrid, LMR } from 'tonva';
import { CMe } from './index';
import { observer } from 'mobx-react';

export class VMe extends VPage<CMe> {

    async open() {
        //this.openPage(this.page);
    }

    private exit() {
        nav.showLogout();
    }

    private openSettingPage = async () => {

        this.controller.openSettingPage();
    }

    private meInfo = observer(() => {
        let { user } = nav;
        if (user === undefined) return null;
        let { id, name, nick, icon } = user;
        return <LMR className="py-2 cursor-pointer w-100"
            left={<Image className="w-3c h-3c mr-3" src={icon} />}>

            <div>
                <div>{userSpan(name, nick)}</div>
                <div className="small"><span className="text-muted">ID:</span> {id > 10000 ? id : String(id + 10000).substr(1)}</div>
            </div>
        </LMR>;
    });

    //right={<FA className="align-self-end" name="reorder" />}
    //onClick={() => { this.controller.openSettingPage(); }}

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
                    component: <IconText iconClass="text-info mr-2" icon="tag" text="入库管理" />,
                    onClick: null
                },
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="tag" text="入库管理" />,
                    onClick: null
                },
                '',
                {
                    type: 'component',
                    component: <IconText iconClass="text-info mr-2" icon="gear" text="设置" />,
                    onClick: this.openSettingPage

                },
            ]
            rows.push(...logOutRows);
        }

        /*
        let right =
            <div onClick={() => this.controller.openSettingPage()}>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cogs" icon="ellipsis-h" text="设置" />
                </span>
            </div>;
        */

        return <PropGrid rows={rows} values={{}} />;
    }
}

function userSpan(name: string, nick: string): JSX.Element {
    return nick ?
        <><b>{nick} &nbsp; <small className="muted">{name}</small></b></>
        : <b>{name}</b>
}