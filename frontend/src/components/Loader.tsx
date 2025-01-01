import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Loader: React.FC = () => {
    const [loading] = useState<boolean>(true);

    return (
        <div className="sweet-loading text-center mt-150">
            <ClipLoader
                color="#000"
                loading={loading}
                cssOverride={{}} // Updated to match expected prop type
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loader;