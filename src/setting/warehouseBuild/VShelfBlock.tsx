
import * as React from 'react';
import { Page, VPage, UiSchema, Schema, Context, UiInputItem, Form } from 'tonva';
import { CWarehouse } from './CWarehouse';

const schema: Schema = [

    { name: 'id', type: 'number', required: false },
    { name: 'no', type: 'string', required: true },
    { name: 'name', type: 'string', required: true },
    { name: 'shelfLayer', type: 'number', required: true }
];

export class VShelfBlock extends VPage<CWarehouse> {

    private shelfBlock: any;
    private form: Form;

    private uiSchema: UiSchema = {
        items: {
            id: { widget: 'text', label: '所属货架层Id', visible: false, readOnly: true } as UiInputItem,
            no: { widget: 'text', label: '货位编码', placeholder: '请输入货位编码' } as UiInputItem,
            name: { widget: 'text', label: '货位名称', placeholder: '请输入货位名称' } as UiInputItem,
            shelfLayer: { widget: 'text', label: '所属货位编号', visible: false, readOnly: true } as UiInputItem,
            submit: { widget: 'button', label: '新增', className: 'btn btn-primary w-8c' }
        }
    };

    async open(shelfBlock: any) {

        this.shelfBlock = shelfBlock;
        this.openPage(this.page);
    }

    private onFormButtonClick = async (name: any, context: Context) => {

        let shelfBlockId: any;
        if (this.shelfBlock !== undefined) {
            shelfBlockId = this.shelfBlock.id;
        }

        await this.controller.saveShelfblock(shelfBlockId, context.form.data);
    };

    private saveShelfBlock = async () => {
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
        let { currentShelfLayer } = this.controller;
        let shelfBlock = this.shelfBlock;

        if (shelfBlock !== undefined) {

            // buttonDel = <button className="btn btn-sm btn-info" onClick={this.onDelWarehouse}>删除</button>;
            header = <header><div className="px-0">{shelfBlock.name}{ }修改</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveShelfBlock}>修改</button>;

        } else {
            shelfBlock = {
                'shelfLayer': currentShelfLayer.id
            };
            header = <header><div className="px-0">{currentShelfLayer.name}新增货架组</div></header>;
            footer = <button type="button" className="btn btn-primary w-100" onClick={this.saveShelfBlock}>新增</button>;
        }

        return <Page header={header} footer={footer} right={buttonDel}>
            <div className="mx-3">
                <Form ref={v => this.form = v} className="my-3"
                    schema={schema}
                    uiSchema={this.uiSchema}
                    formData={shelfBlock}
                    onButtonClick={this.onFormButtonClick}
                    fieldLabelSize={3} />
            </div>
        </Page>;
    };
}