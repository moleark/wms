
import * as React from 'react';
// import _ from 'lodash';
import { Page, VPage, UiSchema, Schema, Context, UiInputItem, UiRadio, Form } from 'tonva';
import { CWarehouse } from './CWarehouse';

const schema: Schema = [

    { name: 'id', type: 'number', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'warehouse', type: 'number', required: true },
    { name: 'isValid', type: 'number', required: false }
];

export class VWarehouseBuilding extends VPage<CWarehouse> {

    private warehouseBuilding: any;
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { widget: 'text', label: '所属库房Id', visible: false, readOnly: true } as UiInputItem,
            no: { widget: 'text', label: '库区编码', placeholder: '请输入库区编码' } as UiInputItem,
            name: { widget: 'text', label: '库区名称', placeholder: '请输入库区名称' } as UiInputItem,
            warehouse: { widget: 'id', label: '所属库房编号', visible: false, readOnly: true } as UiInputItem,
            isValid: {
                widget: 'radio', label: '是否有效', placeholder: '是否有效',
                defaultValue: 1,
                list: [{ value: 1, title: '有效' }, { value: 0, title: '无效' }],
                radioClassName: 'w-min-6c d-inline-block'
            } as UiRadio,
            submit: { widget: 'button', label: '新增', className: 'btn btn-primary w-8c' }
        }
    };

    async open(warehouseBuilding: any) {

        this.warehouseBuilding = warehouseBuilding;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: any, context: Context) => {

        let warehouseBuildId: any;
        if (this.warehouseBuilding !== undefined) {
            warehouseBuildId = this.warehouseBuilding.id;
        }

        await this.controller.saveWarehouseBuilding(warehouseBuildId, context.form.data);
    };

    private saveWarehouseBuilding = async () => {
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
        let { currentWarehouse } = this.controller;
        let warehouseBuild = this.warehouseBuilding;

        if (warehouseBuild !== undefined) {

            // buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelWarehouse}>删除</button>;
            header = <header><div className="px-0">{warehouseBuild.warehouse.name}{warehouseBuild.name}修改</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveWarehouseBuilding}>修改</button>;

        } else {
            warehouseBuild = {
                'warehouse': currentWarehouse.id
            };
            header = <header><div className="px-0">{currentWarehouse.name}新增库区</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveWarehouseBuilding}>新增</button>;
        }

        return <Page header={header} footer={footer} right={buttonDel}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={warehouseBuild}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3} />
            </div>
        </Page>;
    };
}