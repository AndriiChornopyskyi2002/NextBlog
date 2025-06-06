'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import React from "react";

interface Props {
    children: React.ReactNode;
}

export const ReduxProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};
