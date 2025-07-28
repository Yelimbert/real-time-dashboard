'use client';
import { setClientId } from '@/app/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function useClientId() {
  const dispatch = useDispatch();

  useEffect(() => {
    let id = sessionStorage.getItem('clientId');
    if (!id) {
      id = crypto.randomUUID(); // Genera uno único por navegador
      sessionStorage.setItem('clientId', id);
    }
    dispatch(setClientId(id));
  }, [dispatch]);
}
