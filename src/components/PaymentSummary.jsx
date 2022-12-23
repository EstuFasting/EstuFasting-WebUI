import React from 'react';
import {Icon, Table} from "semantic-ui-react";

function PaymentSummary({lunchCount, dinnerCount}) {

    return (
        <div className="border" style={{borderRadius: 15}}>
            <div className="summary">
                <Icon name="file alternate outline"/>
                <h5 className="d-inline">Alışveriş özeti</h5>
                <Table basic="very" padded className="mt-3">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className="p-0">Öğün</Table.HeaderCell>
                            <Table.HeaderCell className="p-0" textAlign="center">Adet</Table.HeaderCell>
                            <Table.HeaderCell className="p-0" textAlign="right">Fiyat</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell collapsing className="border-0">
                                <Icon name='food' color="teal"/> Öğle yemeği
                            </Table.Cell>
                            <Table.Cell collapsing textAlign='right'
                                        className="border-0">({lunchCount}x)</Table.Cell>
                            <Table.Cell collapsing textAlign='right' className="border-0">
                                ₺{lunchCount * 5},00
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="border-0">
                                <Icon name='food' color="red"/> Akşam Yemeği
                            </Table.Cell>
                            <Table.Cell collapsing textAlign='right'
                                        className="border-0">({dinnerCount}x)</Table.Cell>
                            <Table.Cell textAlign='right' className="border-0">
                                ₺{dinnerCount * 5},00
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            <hr className="p-0 m-0"/>
            <div className="w-100 p-3 text-end">
                <div style={{height: 40}}>
                    <strong>Toplam: </strong>
                    <h4 className="d-inline">₺{(dinnerCount + lunchCount) * 5},00</h4>
                </div>
            </div>
        </div>
    );
}

export default PaymentSummary;