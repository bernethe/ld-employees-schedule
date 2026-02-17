import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import './modal.css';

const Modal = ({ children, onClose, closeWithBackdrop = false}) => {

	const modalRef = useRef();
	if (!onClose) {
		throw new Error('Modal requires an onClose function prop');
	}
	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		// document.body.classList.add('ld-modal-open');
		return () => {
			// document.body.classList.remove('ld-modal-open');
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	return createPortal(<div className='ld-modal'  onClick={ closeWithBackdrop ? onClose : undefined } data-state='open' ref={modalRef}>
		<div onClick={(e) => e.stopPropagation()} className='ld-modal-content'>
			{children}
			<button className='ld-modal-close-btn' onClick={onClose}><FaTimes /></button>
		</div>
	</div>, document.body);
}

export default Modal