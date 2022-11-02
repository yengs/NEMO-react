import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import GoogleLogin from "../img/btn_google_signin_dark_normal_web@2x.png";

function Singo() {

    
    return (
        <div className="mypageInnerPage">
            <div className="regiUserItemList">
                <h3 className="pageTitle">신고하기</h3>

                <div className="joinWrap memberPage container loginForm">
            
            <form>
                <div className="inputTable">
                    <table>
                        <tbody>
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
                                        <input type="submit" className="greenBtn btn" value="신고하기" />
                                        <input type="submit" className="greenBtn btn" value="신고하기" />
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