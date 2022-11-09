import axios from "axios";
import { useEffect, useState } from "react";

export default function ImgIcon() {

    const [mysatisf, setMySatisF] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/review/myReview')
            .then(response => {
                console.log(response);
                const reviewSatisFaction = response.data.map(review => review.reviewSatisFaction);
                setMySatisF(reviewSatisFaction);
            })
            .catch(error => console.log(error));
    }, []);

    if (mysatisf) {
        return <div><img src="C:/react/NEMO-react/nemo-project/src/img/clean/0" alt="0"></img></div>;
    } else if (mysatisf > 0 && mysatisf < 20) {
        return <div><img src="C:/react/NEMO-react/nemo-project/src/img/clean/20" alt="0"></img></div>
    } else if (mysatisf > 20 && mysatisf < 40) {
        return <div><img src="C:/react/NEMO-react/nemo-project/src/img/clean/40" alt="0"></img></div>
    } else if (mysatisf > 40 && mysatisf < 60) {
        return <div><img src="C:/react/NEMO-react/nemo-project/src/img/clean/60" alt="0"></img></div>
    } else if (mysatisf > 60 && mysatisf < 80) {
        return <div><img src="C:/react/NEMO-react/nemo-project/src/img/clean/80" alt="0"></img></div>
    } else if (mysatisf > 80 && mysatisf < 100) {
        return <div><img src="C:/react/NEMO-react/nemo-project/src/img/clean/100" alt="0"></img></div>
    } 

};
