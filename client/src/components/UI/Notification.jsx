import React, { useContext } from 'react'
import { NetworkContext } from '../../contexts/NetworkContext';

export const Notification = () => {
    const { networkStatus } = useContext(NetworkContext);
    const { isOnline, showNotification, message } = networkStatus;

    if (!showNotification) return null;

    return (
        <div className={`my-2 p-2 rounded shadow cursor-pointer ${isOnline ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            <p className={`font-medium text-xs`}>{message}</p>
        </div>
    );
};