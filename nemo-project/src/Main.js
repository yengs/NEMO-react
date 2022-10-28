import { Link } from "react-router-dom";

function Main() {
    const styles = {
        container: {
            width: 300, 
            marginLeft: 'auto', 
            marginRight: 'auto', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '100vh'
        },
        menu: {
            border: '1px solid gray', 
            borderRadius: 20, 
            backgroundColor: 'lightgray',
            display: 'flex', 
            margin: 10, 
            padding: 20, 
            
        }
    }
    return (
        <>
            <div style={styles.container}>
                <div style={styles.menu}><Link to="/item">상품리스트</Link></div>
                <div style={styles.menu}><Link to="/member">회원가입</Link></div>
            </div>
        </>
    );
}

export default Main;