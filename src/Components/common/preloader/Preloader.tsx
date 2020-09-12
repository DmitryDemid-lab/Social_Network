import React from 'react';
import preLoaderIMG from "../../../assets/images/Spinner-1s-200px.svg";

type PreloaderType = {}

function Preloader(props: PreloaderType) {
    return (
        <div style={{textAlign: 'center'}}>
            <img src={preLoaderIMG}/>
        </div>
    )
};

export default Preloader;