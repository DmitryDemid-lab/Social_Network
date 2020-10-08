import React from 'react';
import {CircularProgress} from "@material-ui/core";

export const WithSuspense = (Component: any) => {
    return (props: any) => {
        return <React.Suspense fallback={<div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color={"secondary"}/>
        </div>}>
            <Component {...props}/>
        </React.Suspense>
    }
};