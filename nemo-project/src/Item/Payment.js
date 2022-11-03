import React, { useState } from 'react';
import Modal from './Modal';


function Payment() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);
  const [payment, setPayment] = useState('1');

  const selectcard = (e) => setPayment('1');
  const selectkakao = (e) => setPayment('2');
  const selecttoss = (e) => setPayment('3');
  const selecttransfer = (e) => setPayment('4');
  const selectcell = (e) => setPayment('5');
console.log(payment)

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
        <div className='payselect' name = "payment" onClick={selectcard}>신용/체크카드</div>
        <div className='payselect' name = "payment" onClick={selectkakao}>카카오페이</div>
        <div className='payselect' name = "payment" onClick={selecttoss}>토스페이</div>
        <div className='payselect' name = "payment" onClick={selecttransfer}>간편계좌결제</div>
        <div className='payselect' name = "payment" onClick={selectcell}>휴대폰 결제</div>

        <div className='paytext'>
        {(function() {
        if(payment == "1"){
            return <div><select className='payment2'>
            <option disabled selected>카드선택</option>
            <option>신한카드</option>
            <option>롯데카드</option>
            <option>삼성카드</option>
            <option>우리카드</option>
        </select>
        <div className='paynotice'>
                결제 수단에 대한 내용 어쩌구 사용안내<br/>
                카드로 결제하시려면 .....<br/>
                　｡・｡∧_∧｡・｡<br/>
                ｡ﾟ 　( ﾟ´Д｀)　 ﾟ｡<br/>
                　　o( U U<br/>
                　　　'ｰ'ｰ'<br/>
            </div>
        </div>}
        else if(payment == "2"){
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>카카오페이</option>
           
        </select>
        <div className='paynotice'>
                결제 수단에 대한 내용 어쩌구 사용안내<br/>
                카카오 페이로 결제하시려면 .....<br/>
                ╭ ⁀ ⁀ ╮<br/>
                ( '👅'　　)<br/>
                ╰ ‿ ‿ ╯ <br/>
            </div>
        </div>
        }
        else if(payment == "3"){
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>토스</option>
            
        </select>
        <div className='paynotice'>
        결제 수단에 대한 내용 어쩌구 사용안내<br/>
        토스 페이로 결제하시려면 .....<br/>
        . /\__/\<br/>
        ꒰ ˶• ༝ •˶꒱ ~♡︎<br/>
         / v v \<br/>
         |        |<br/>
        づ__づ<br/>
         </div>
        </div> }
        else if(payment == "4"){
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>계좌</option>
          
        </select>
        <div className='paynotice'>
        결제 수단에 대한 내용 어쩌구 사용안내<br/>
        계좌이체 하시려면 .....<br/>
        *゜    (\ (\<br/>
        c(⌒(_*´ㅅ`)_<br/>
         </div>
        </div> }
        else {
            return <div><select className='payment2'>
            <option disabled selected>선택</option>
            <option>핸드폰</option>
        
        </select>
        <div className='paynotice'>
        결제 수단에 대한 내용 어쩌구 사용안내<br/>
        핸드폰으로 결제하시려면 .....<br/>
        /)/)<br/>
        ( . .)★ ´ ˚ °★<br/>
        ( づ♥︎ ★<br/>

        </div>
        </div>}  
        })()
         }
 
        </div>

      </Modal>
    </React.Fragment>
  );
}

export default Payment;