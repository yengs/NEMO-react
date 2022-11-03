import React, { useState } from 'react';
import Modal from './Modal';


function Payment() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>모달팝업</button>
      {/* header 부분에 텍스트를 입력한다. */}
      <Modal open={modalOpen} close={closeModal} header="결제수단">
        {/* Modal.js <main> {props.children} </main>에 내용이 입력된다.  */}
        <div className='payselect'>신용/체크카드</div>
        <div className='payselect'>카카오페이</div>
        <div className='payselect'>토스페이</div>
        <div className='payselect'>간편계좌결제</div>
        <div className='payselect'>휴대폰 결제</div>

        <div className='paytext'>
            <select className='payment2'>
                <option>카드선택</option>
            </select>
            <div className='paynotice'>결제 수단에 대한 내용 어쩌구</div>
        </div>

      </Modal>
    </React.Fragment>
  );
}

export default Payment;