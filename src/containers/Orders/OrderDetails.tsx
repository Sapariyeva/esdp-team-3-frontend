import { useAppDispatch } from '@/app/store.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOrder, setIsModalDetailsOpen } from '@/app/order.slice.ts';
import { Button } from 'antd';
import { ModalOrderDetails } from '@/components/UI/Modal/ModalOrderDetails.tsx';

export const OrderDetails = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const idParams: string | undefined = params.id;
	useEffect(() => {
		if (idParams) dispatch(getOrder(idParams));
	}, [params]);
	return (
		<>
			<Button
				type={'primary'}
				onClick={() => {
					dispatch(setIsModalDetailsOpen());
				}}
			>
				Дополнительная информация
			</Button>
			<ModalOrderDetails />
		</>
	);
};
