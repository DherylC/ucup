import React, { useState, useEffect } from 'react';

const Toast = ({ toasts, removeToast }) => {
    return (
        <div
            className="toast-container position-fixed top-0 end-0 p-3"
            style={{ zIndex: 9999 }}
        >
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast align-items-center text-white ${toast.className} show`}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            <strong>{toast.top}</strong><br />
                            {toast.main}
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            aria-label="Close"
                            onClick={() => removeToast(toast.id)}
                        ></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Toast;
