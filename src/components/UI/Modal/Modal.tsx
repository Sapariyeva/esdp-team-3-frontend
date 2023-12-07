import { IModal } from '@/interfaces/ui.interface.ts';
import { Modal } from 'antd';
import { useAppSelector } from '@/app/store.ts';

export const ModalConfirm = ({ title, children }: IModal) => {
	const { modal } = useAppSelector((store) => store.app);
	return (
		<>
			<Modal
				title={title}
				open={modal}
				footer={null}
				closable={false}
				cancelButtonProps={{ style: { display: 'none' } }}
			>
				{children}
			</Modal>
		</>
	);
};
