import { Button, ConfigProvider, Flex, Modal, Space, Typography } from 'antd';
import {
    modalOrderContainer,
    orderDetailsModalStyle,
} from '@/containers/Orders/OrderDetailsStyle.config.ts';
import { formatDate } from '@/config/main.config.ts';
import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { setIsModalDetailsClose } from '@/app/order.slice.ts';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './modalPerformerOrder.scss';
import { Link } from 'react-router-dom';

export const ModalOrderPerformers = () => {
    const { orderDetails, modalOrderPerformers } = useAppSelector(
        (store) => store.order
    );
    const dispatch = useAppDispatch();
    if (!orderDetails || orderDetails.details === null) {
        return null;
    }

    const { performerOrders } = orderDetails.details;
    return (
        <>
            <ConfigProvider {...orderDetailsModalStyle}>
                <Flex className="orderPerformers" style={modalOrderContainer}>
                    <Modal
                        title={formatDate(orderDetails.details.orderData)}
                        open={modalOrderPerformers}
                        footer={null}
                        onCancel={() => dispatch(setIsModalDetailsClose())}
                        cancelButtonProps={{ style: { display: 'none' } }}
                    >
                        {performerOrders.length !== 0 ? performerOrders.map(performerOrder =>
                            <Flex key={performerOrder.id} align='center'>
                                <Link className='performerOrderTitle' to={`/user/${performerOrder.performer.id}`}>
                                    <Typography.Title level={5}>{performerOrder.performer.displayName}</Typography.Title>
                                    <Typography.Text>{performerOrder.performer.phone}</Typography.Text>
                                </Link>
                                <div className='performerOrderBtnGroup'>
                                    <Button
                                        className='modalPerformerOrderListAcceptBtn'
                                    >
                                        <CheckOutlined style={{ color: '#fff', fontSize: '20px', fontWeight: '800' }} />
                                    </Button>
                                    <Button
                                        className='modalPerformerOrderListDeclineBtn'
                                    >
                                        <CloseOutlined style={{ color: '#fff', fontSize: '20px', fontWeight: '800' }} />
                                    </Button>
                                </div>
                            </Flex>
                        ) : 'Исполнители не найдены'}
                    </Modal>
                </Flex>
            </ConfigProvider>
        </>
    );
};
