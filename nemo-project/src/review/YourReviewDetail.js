import { useState, useEffect } from "react";
import axios from "axios";

export default function YourReviewDetail({ match, location, history }) {

    const { reviewNum } = match.params;
    const [reviewImage, setReviewImage] = useState('');
    const [reviewContents, setReviewContents] = useState('');
    const [reviewSatisfaction, setReviewSatisfaction] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:8080/api/review/yourReview/${reviewNum}`)
            .then(response => {
                console.log(response);
                setReviewImage(response.data);
                setReviewContents(response.data);
                setReviewSatisfaction(response.data);
            })
            .catch(error => { console.log(error) });
    }, []);




}