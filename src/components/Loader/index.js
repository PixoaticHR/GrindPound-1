import React, { useState, useEffect, Fragment } from 'react';
import { loaderService } from '../../services/loader/loaderService';

const Loader = () => {
    const [isLoading, setIsLoading] = useState(false);   
    useEffect(() => {
        // subscribe to loading
        const subscription = loaderService.onLoading()
            .subscribe(loader => {
                // clear alerts when an empty alert is received
                setIsLoading(loader);
            });

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
        };
    }, []);

    return (
        <Fragment>
            { isLoading? <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos"></div>
                    <div className="lds-pos"></div>
                </div>
            </div>:null}
        </Fragment>
    );
}

export default Loader ;