
import * as React from 'react';
import _ from 'lodash';
import { Page, VPage, UiSchema, Schema, Context, UiInputItem, Form } from 'tonva';
import { CWarehouse } from './CWarehouse';

const schema: Schema = [
    { name: 'id', type: 'number', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'name', type: 'string', required: true }
];

export class VWarehouse extends VPage<CWarehouse> {

    private warehouse: any;
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { widget: 'text', label: '库房Id', visible: false } as UiInputItem,
            no: { widget: 'text', label: '库房编码', placeholder: '请输入库房编码' } as UiInputItem,
            name: { widget: 'text', label: '库房名称', placeholder: '请输入库房名称' } as UiInputItem,
            submit: { widget: 'button', label: '新增', className: 'btn btn-primary w-8c' }
        }
    };

    async open(warehouse: any) {
        this.warehouse = warehouse;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: any, context: Context) => {

        let warehouseId: any;
        if (this.warehouse !== undefined) {
            warehouseId = this.warehouse.id;
        }
        await this.controller.saveWarehouse(warehouseId, context.form.data);
    };

    private onSaveWarehouse = async () => {
        if (!this.form) return;
        await this.form.buttonClick('submit');
    }

    private onDelWarehouse = async () => {
        // let { contact } = this.warehouseData;
    }

    private page = () => {

        let buttonDel: any;
        let header: any;
        let footer: any;

        if (this.warehouse !== undefined) {
            //buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelWarehouse}>删除</button>;
            header = <header><div className="px-0">修改库房信息</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.onSaveWarehouse}>修改</button>;
        } else {
            header = <header><div className="px-0">新增库房</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.onSaveWarehouse}>新增</button>;
        }

        return <Page header={header} footer={footer} right={buttonDel}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={this.warehouse}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3} />
            </div>
        </Page>;
    };
}