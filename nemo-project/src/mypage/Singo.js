import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Shirt from '../img/shirt.jpg';
import ItemSlider from "./ItemSlider.js";

import GoogleLogin from "../img/btn_google_signin_dark_normal_web@2x.png";

function Singo() {

    
    return (
        <div className="mypageInnerPage">
            <div className="regiUserItemList">
                <h3 className="pageTitle">신고하기</h3>

                <div className="memberPage2 container loginForm2">
            
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
                        <tr>
                                <td>사진첨부</td>
                                
                            </tr>
                            <tr>
                             <td>
                            
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTPJg6Tgw-P2brcvdMAxNcnUqT9udTDuSUw&usqp=CAU"/>
                           
                             </td>
                            </tr>
                            <tr>
                                <td>신고이유</td>
                            </tr>
                            <tr>
                                <td>
                                    <select >
                                        <option>선택</option>
                                        <option>미반환</option>
                                        <option>사기 행위</option>
                                        <option>물품 훼손</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>신고내용</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" className="singobox"/>
                                </td>
                            </tr>
                            <tr>
                            <td>
                                    <div className="btnWrap">
                                        <input type="submit" className="redBtn2 btn" value="신고하기" />
                                        <input type="submit" className="grayBtn2 btn" value="취소" />
                                    </div>
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>

               
                
            </form>
        </div>


            </div> 
        </div>
    );
}

export default Singo;