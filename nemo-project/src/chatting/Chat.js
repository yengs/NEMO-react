import styled from 'styled-components';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import axios from "axios";


const Chat = ({match}) => {

    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    
    const [datas, setDatas] = useState({});
    const {itemWriter} = match.params;

    const ws = useRef(null);    //webSocket을 담는 변수

    const msgBox = chatt.map((item, idx) => (
        <div key={idx} >
            <div className={item.name === name ? 'me' : 'other'}>
            <span><b>{item.name}</b></span> <br/><br/>
            <span>{item.msg}</span>
        </div>
        <span className={item.name === name ? 'me' : 'other'}>{item.date}</span>
        </div>
    ));


    const memberNum = sessionStorage.getItem('memberNum');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/member/info/${memberNum}`)
            .then(response => {
                console.log("업데이트페이지 멤버넘버::::" + memberNum);
                console.log(response);
                setDatas(response.data);
                setName(response.data.memberNickname);
                webSocketLogin();
            })
            .catch(error => console.log(error));
    }, []);


    useEffect(() => {
        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            console.log(">>>", tempData);
            setChatt(tempData);
            sessionStorage.setItem("chatLog", JSON.stringify(tempData));
        }
    }, [socketData]);

    useEffect(() => {
        const tempData = sessionStorage.getItem("chatLog");
        if (tempData) 
            setChatt(JSON.parse(tempData));
    }, []);

    console.log(sessionStorage.getItem("chatLog"))
   

    //webSocket
    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }

    
    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8080/socket/chatt");

        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        }
    });
   
    const send = useCallback(() => {
        if(!chkLog) {
            setChkLog(true);
        }

        if(msg !== ''){
            const data = {
                name,
                msg,
                date: new Date().toLocaleTimeString(['en-GB'], {timeStyle: 'short'}),
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => {    //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                }
            }else {
                ws.current.send(temp);
            }
        }else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
    });
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket
    //webSocket


    
    return (
        <>
            <MyWebsocket>
            <div id="chat-wrap">
                <div id='chatt'>
                    <h1 id="title">내모 채팅방</h1>
                    <br/>
                    <div id='talk'>
                        {msgBox}
                    </div>
                     <div className="chat" >
                                       <input className="chat-input"  id='msg' value={msg} onChange={onText}
                            onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}  required/>
                                       <button   className="chat-botton"   id='btnSend' onClick={send} type="submit">↑</button>
                                 </div> 
                </div>
            </div>
            </MyWebsocket>
        </>
        
    );
};


const MyWebsocket = styled.div`

.jesJjI {

}

.chat {
    position: relative;
    width: 460px;
    padding: 15px 0 0 0;
  }


  .chat-input {
    border: 1px solid rgb(241,241,241);
    background-color: #ffffff;
    padding: 10px 9px;
    padding-left: 8px !important;
    border-radius: 34px;
    font-size: 15px;
    margin-left: 10px;
    outline: none;
    width:100%
}
  .chat-botton {
    position: absolute;
    right: -3px;
    top: 20px;
    border: 0;
    background: rgb(100 165 127);
    color: #fff;
    outline: none;
    margin: 0;
    border-radius: 41px;
    z-index: 2;
    width: 30px;
    height: 30px;
    font-size: 20px;
}

& {
    width:500px;
    background-color: rgb(220 241 229);
    margin: 50px auto;
    padding:20px 10px 15px;
    border-radius: 20px;

  }
  /* input 기본 스타일 초기화 */
  input {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
  }
  
 
  input::-ms-clear { display: none; }
  

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
  }
  
  #chatt{
      width: 100%;
      margin: 0 auto;
    #title{
      font-size: 30pt;
      text-align: center;
      margin-bottom: 20px;
    }
  
    #talk{
      width: 100%;
      height: 500px;
      overflow-y: auto;
      position: relative;

      .talk-shadow{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
      }
  
      div{
        width: 220px;
        display: block;
        padding: 10px;
        border-radius:10px;
        box-sizing: border-box;
  
        &.me{
          background-color : #ffc;
          margin : 20px 0px 5px 240px;	
        }
  
        &.other{
            background-color :rgb(251 251 251);
          margin : 20px 0px 5px 0;	
        }
      }
    }
  
    span{
      &.me{
       
        margin : 20px 0px 5px 410px;	
      }

      &.other{
        margin : 20px 0px 5px 10px;	
      }
    }
    #name{
      display: block;
      border: 1px solid #dcdcdc;
      background-color: #EDEDED;
      padding:5px 2px;
      margin-top: 20px;
    }
  
    #sendZone{
      > * {vertical-align: top;}
      margin-top: 10px;
      $sendZone-H : 70px;
      display: flex;
  
      #msg{
        width: 90%;
        height: $sendZone-H;
        display: block;
        resize: none;
        border: 1px solid #dcdcdc;
        background-color: #fff;
        box-sizing: border-box;
      }
      #btnSend{
        width: 10%;
        height: $sendZone-H;
        border: 1px solid #dcdcdc;
      }
    }
  }
  `
export default Chat;


