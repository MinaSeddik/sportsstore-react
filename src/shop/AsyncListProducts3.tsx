import React, {Suspense} from 'react';
import ListProducts3 from "./ListProducts3";
import ErrorBoundary from "./ErrorBoundary";

function AsyncListProducts3() {

    // @ts-ignore
    return (
        <ErrorBoundary fallback={() => <h1>🌀 Error... </h1>}>
            <Suspense fallback={<h1>🌀 Loading... </h1>}>
                <ListProducts3/>
            </Suspense>
        </ErrorBoundary>
    );
}

export default AsyncListProducts3;