import React from 'react';

const Error: React.FC = () => {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
                Something went wrong! Please try again later.
            </div>
        </div>
    );
};

export default Error;
