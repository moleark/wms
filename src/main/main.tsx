import * as React from 'react';
import { VPage, TabCaptionComponent, Page, Tabs } from 'tonva';
import { observable } from 'mobx';
import { CApp } from '../CApp';
//import { browser } from 'tools/browser';
//import { GLOABLE } from 'cartenv';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';

export class VMain extends VPage<CApp> {
    async open(param?: any) {
        this.calcSum();
        this.openPage(this.render);
    }

    /*
    downloadApp = () => {
        if (browser.versions.android)
            window.open(GLOABLE.ANDROIDAPPADDRESS);
    }
    */

    render = (param?: any): JSX.Element => {
        let { cHome, cInBound, cOutBound, cSetting, cMe } = this.controller;
        let faceTabs = [
            { name: 'home', label: '首页', icon: 'home', content: cHome.tab, notify: undefined },
            { name: 'inbound', label: '入库', icon: 'sign-in', content: cInBound.tab, notify: undefined },
            { name: 'outbound', label: '出库', icon: 'sign-out', content: cOutBound.tab, notify: undefined },
            { name: 'me', label: '我的', icon: 'user', content: cMe.tab }
        ].map(v => {
            let { name, label, icon, content, notify } = v;
            return {
                name: name,
                caption: (selected: boolean) => TabCaptionComponent(label, icon, color(selected)),
                content: content,
                notify: notify,
            }
        });

        let header: any = false;

        /*
        if (!browser.versions.html5Plus && browser.versions.android) {
            header = <div className="w-100 mx-3 d-flex justify-content-between" onClick={this.downloadApp}>
                <span className="pt-2 small text-danger">
                    APP购物更方便
                </span>
                <button type="button" className="btn btn-primary btn-sm">立即安装</button>
            </div>
        }
        */

        return <Page header={header} headerClassName="bg-warning" >
            <Tabs tabs={faceTabs} />
        </Page>;
    }

    count = observable.box<number>(0);
    protected calcSum = () => {
        this.count.set(0);
    }
}
