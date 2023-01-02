import React from "react";
import {useTranslation} from "react-i18next";

export default function Footer() {

    const {t} = useTranslation();

    return (
        <div className={"footer"}>
            2022© {t("All Rights Reserved")}. {t("Eskisehir Technical University")}
        </div>
    );
}