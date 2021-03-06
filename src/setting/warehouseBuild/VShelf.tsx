
import * as React from 'react';
import { Page, VPage, UiSchema, Schema, Context, UiInputItem, UiRadio, Form } from 'tonva';
import { CWarehouse } from './CWarehouse';

const schema: Schema = [

    { name: 'id', type: 'number', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'warehouseRoom', type: 'number', required: true },
    { name: 'isValid', type: 'number', required: true }
];

export class VShelf extends VPage<CWarehouse> {

    private shelf: any;
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { widget: 'text', label: 'Id', visible: false, readOnly: true } as UiInputItem,
            no: { widget: 'text', label: '货架编码', placeholder: '请输入货架组编码' } as UiInputItem,
            name: { widget: 'text', label: '货架名称', placeholder: '请输入货架组名称' } as UiInputItem,
            warehouseRoom: { widget: 'id', label: '所属房间Id', visible: false, readOnly: true } as UiInputItem,
            isValid: { widget: 'radio', label: '是否有效', defaultValue: 1, list: [{ value: 1, title: '有效' }, { value: 0, title: '无效' }] } as UiRadio,
            submit: { widget: 'button', label: '新增', className: 'btn btn-primary w-8c' }
        }
    };

    async open(shelf: any) {

        this.shelf = shelf;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: any, context: Context) => {

        let shelfId: any;
        if (this.shelf !== undefined) {
            shelfId = this.shelf.id;
        }

        await this.controller.saveShelf(shelfId, context.form.data);
    };

    private saveShelf = async () => {
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
        let { currentWarehouseRoom } = this.controller;
        let shelf = this.shelf;

        if (shelf !== undefined) {

            // buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelWarehouse}>删除</button>;
            header = <header><div className="px-0">{shelf.name}{ }修改</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveShelf}>修改</button>;

        } else {
            shelf = {
                'warehouseRoom': currentWarehouseRoom.id
            };
            header = <header><div className="px-0">{currentWarehouseRoom.name}新增货架组</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveShelf}>新增</button>;
        }

        return <Page header={header} footer={footer} right={buttonDel}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={shelf}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3} />
            </div>
        </Page>;
    };
}