import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
//import "./index.css";
import { surveyJSON } from "./survey";

function SurveyJS() {
    const survey = new Model(surveyJSON);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        fetch("/api/v1/survey-js", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sender.data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    });
    return (<Survey model={survey} />);
}

export default SurveyJS;