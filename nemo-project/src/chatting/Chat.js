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

    const ws = useRef(null);    //webSocket을 담는 변수, 
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

    const msgBox = chatt.map((item, idx) => (
        <div key={idx} className={item.name === name ? 'me' : 'other'}>
            <span><b>{item.name}</b></span> [ {item.date} ]<br/>
            <span>{item.msg}</span>
        </div>
    ));


    const memberNum = sessionStorage.getItem('memberNum');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/member/info/${memberNum}`)
            .then(response => {
                console.log("업데이트페이지 멤버넘버::::" + memberNum);
                console.log(response);
                setDatas(response.data);
                setName(response.data.memberId);
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
    //webSocket
    //webSocket
    //webSocket
    //webSocket
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
                date: new Date().toLocaleString(),
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
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
                    <h1 id="title">네모 채팅방</h1>
                    <br/>
                    <div id='talk'>
                        <div className='talk-shadow'></div>
                        {msgBox}
                    </div>
                    <input disabled={chkLog}
                        type='text' 
                        id='name' 
                        value={datas.memberId} 
                        readOnly     
                        />
                    <div id='sendZone'>
                        <textarea id='msg' value={msg} onChange={onText}
                            onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                        <input type='button' value='전송' id='btnSend' onClick={send}/>
                    </div>
                </div>
            </div>
            </MyWebsocket>
        </>
        
    );
};


const MyWebsocket = styled.div`
& {
    width:500px;
    background-color: #ededed;
    margin: 50px auto;
    padding:20px 10px;
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
      height: 400px;
      overflow-y: auto;
      border-radius: 18px;
      position: relative;
  
      .talk-shadow{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
  
      div{
        width: 60%;
        display: block;
        padding: 10px;
        border-radius:10px;
        box-sizing: border-box;
  
        &.me{
          background-color : #ffc;
          margin : 0px 0px 20px 40%;	
        }
  
        &.other{
            background-color : #fff;
          margin : 20px 0px 2px 0;	
        }
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


