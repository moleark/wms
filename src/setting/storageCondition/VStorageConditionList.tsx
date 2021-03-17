import * as React from 'react';
import { Page, VPage, FA, List, LMR, tv } from 'tonva';
import { CStorageCondition } from './CStorageCondition';
import { observer } from 'mobx-react';


export class VStorageConditionList extends VPage<CStorageCondition> {

    async open() {

        this.openPage(this.page);
    }

    private renderStorageCondition = (storageCondition: any) => {

        let { editStorageCondition } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="thermometer" />
        </div>
        let right = <div className="p-1 cursor-pointer text-info" onClick={() => editStorageCondition(storageCondition)}>
            <FA name="edit" />
        </div>

        return <LMR left={left} right={right} className="px-2 py-2">
            <div className="px-1 py-1">
                {tv(storageCondition, v => <>{v.name}</>)}
            </div>
        </ LMR>
    }

    private page = observer(() => {

        let { storageConditions, newStorageCondition } = this.controller;

        let header = <header>
            <div className="px-0"><span>存储条件管理</span></div>
        </header>;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => newStorageCondition()} >添加存储条件</button>;
        let storageConditionList = <List items={storageConditions} item={{ render: this.renderStorageCondition }} none="无存储条件" />;

        return <Page header={header} footer={footer}>
            {storageConditionList}
        </Page>;
    });
}