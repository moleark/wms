
import * as React from 'react';
import { Page, VPage, UiSchema, Schema, Context, UiInputItem, Form, List, FA, LMR, tv } from 'tonva';
import { CStorageCondition } from './index';

const schema: Schema = [
    { name: 'id', type: 'number', required: false },
    { name: 'name', type: 'string', required: true },
    { name: 'description', type: 'string', required: true }
];

export class VStorageCondition extends VPage<CStorageCondition> {

    private storageCondition: any;
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { widget: 'text', label: '存储条件Id', visible: false } as UiInputItem,
            name: { widget: 'text', label: '存储条件名称', placeholder: '请输入存储条件名称' } as UiInputItem,
            description: { widget: 'textarea', label: '存储条件描述', placeholder: '请输入存储条件描述', rows: 3 } as UiInputItem,
            submit: { widget: 'button', label: '新增', className: 'btn btn-primary w-8c' }
        }
    };

    async open(storageCondition: any) {
        this.storageCondition = storageCondition;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: any, context: Context) => {

        let storageConditionId: any;
        if (this.storageCondition !== undefined) {
            storageConditionId = this.storageCondition.id;
        }
        await this.controller.saveStorageCondition(storageConditionId, context.form.data);
    };

    private saveStorageCondition = async () => {
        if (!this.form) return;
        await this.form.buttonClick('submit');
    }

    private onDelStorageCondition = async () => {
        // let { contact } = this.warehouseData;
    }

    private renderStorageConditionMap = (storageCondition: any) => {

        let { deleteStorageConditionMap } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="thermometer" />
        </div>
        let right = <div className="p-1 cursor-pointer text-info" onClick={() => deleteStorageConditionMap(this.storageCondition, storageCondition)}>
            <FA name="remove" />
        </div>

        return <LMR left={left} right={right} className="px-0 py-0">
            <div className="px-1 py-1">
                {tv(storageCondition, v => <>
                    <span style={{ color: 'gray', fontSize: 'smaller', fontWeight: "bold" }}>{v.no}</span>
                    <span style={{ color: 'gray', fontSize: 'smaller', paddingLeft: '10px' }}>{v.name}</span>
                </>)}
            </div>
        </ LMR >
    }

    private page = () => {

        let buttonDel: any;
        let header: any;
        let footer: any;
        let page: any;
        let { storageConditionMaps, selectStorageCondition } = this.controller;

        if (this.storageCondition !== undefined) {

            let storageConditionMapList = <List items={storageConditionMaps} item={{ render: this.renderStorageConditionMap }} none="无对应系统存储条件" />;

            //buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelWarehouse}>删除</button>;
            header = <header><div className="px-0">修改存储条件</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveStorageCondition}>修改</button>;
            page = <Page header={header} footer={footer} right={buttonDel}>

                <div className="mx-3">
                    <Form ref={v => this.form = v} className="my-3"
                        schema={schema}
                        uiSchema={this.uiSchema}
                        formData={this.storageCondition}
                        onButtonClick={this.onFormButtonClick}
                        fieldLabelSize={3} />
                </div>

                <div className="mx-3">

                    <div className="d-flex justify-content-between">
                        <span className="px-1 py-1" style={{ fontSize: 'smaller', fontWeight: "normal" }}>对应系统存储条件：</span>
                        <span className="px-1 py-1 text-primary" style={{ fontSize: 'smaller' }} onClick={() => selectStorageCondition(this.storageCondition)}>
                            <FA name="plus" />增加
                        </span>
                    </div>
                    {storageConditionMapList}
                </div>
            </Page >;

        } else {

            header = <header><div className="px-0">新增存储条件</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveStorageCondition}>新增</button>;
            page = <Page header={header} footer={footer} right={buttonDel}>
                <div className="mx-3">
                    <Form ref={v => this.form = v} className="my-3"
                        schema={schema}
                        uiSchema={this.uiSchema}
                        formData={this.storageCondition}
                        onButtonClick={this.onFormButtonClick}
                        fieldLabelSize={3} />
                </div>
            </Page>;
        }

        return page;
    };
}