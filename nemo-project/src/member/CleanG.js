import axios from "axios";
import { useEffect, useState } from "react";

export default function CleanG({ match }) {

    const [reviewId, setReviewId] = useState([]);
    const [reviewSatisFaction, setReviewSatisfaction] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/yourReview/${reviewId}`)
            .then(response => {
                console.log(response);
                setReviewSatisfaction(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    

    return (
        <>
            sdfasdfasdfasdf
        </>
    );
}