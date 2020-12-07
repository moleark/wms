
import * as React from 'react';
import { Page, VPage, UiSchema, Schema, Context, UiInputItem, UiRadio, Form } from 'tonva';
import { CWarehouse } from './CWarehouse';

const schema: Schema = [

    { name: 'id', type: 'number', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'warehouseBuilding', type: 'number', required: true },
    { name: 'isValid', type: 'number', required: true }
];

export class VWarehouseRoom extends VPage<CWarehouse> {

    private warehouseRoom: any;
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { widget: 'text', label: 'Id', visible: false, readOnly: true } as UiInputItem,
            no: { widget: 'text', label: '房间编码', placeholder: '请输入房间编码' } as UiInputItem,
            name: { widget: 'text', label: '房间名称', placeholder: '请输入房间名称' } as UiInputItem,
            warehouseBuilding: { widget: 'text', label: '所属库区Id', visible: false, readOnly: true } as UiInputItem,
            isValid: { widget: 'radio', label: '是否有效', defaultValue: 1, list: [{ value: 1, title: '有效' }, { value: 0, title: '无效' }] } as UiRadio,
            submit: { widget: 'button', label: '新增', className: 'btn btn-primary w-8c' }
        }
    };

    async open(warehouseRoom: any) {

        this.warehouseRoom = warehouseRoom;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: any, context: Context) => {

        let warehouseRoomId: any;
        if (this.warehouseRoom !== undefined) {
            warehouseRoomId = this.warehouseRoom.id;
        }

        await this.controller.saveWarehouseRoom(warehouseRoomId, context.form.data);
    };

    private saveWarehouseRoom = async () => {
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
        let { currentWarehouseBuild } = this.controller;
        let warehouseRoom = this.warehouseRoom;

        if (warehouseRoom !== undefined) {

            // buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelWarehouse}>删除</button>;
            header = <header><div className="px-0">{warehouseRoom.name}{ }修改</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveWarehouseRoom}>修改</button>;

        } else {
            warehouseRoom = {
                'warehouseBuilding': currentWarehouseBuild.id
            };
            header = <header><div className="px-0">{currentWarehouseBuild.name}新增房间</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveWarehouseRoom}>新增</button>;
        }

        return <Page header={header} footer={footer} right={buttonDel}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={warehouseRoom}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3} />
            </div>
        </Page>;
    };
}