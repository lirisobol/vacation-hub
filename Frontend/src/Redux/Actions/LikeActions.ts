import { createAsyncThunk } from '@reduxjs/toolkit';
import { likeService } from '../../Services/LikeService';

export const likeVacation = createAsyncThunk(
    'likes/likeVacation',
    async (vacationId: string) => {
        await likeService.likeVacation(vacationId);
        return vacationId; // Return the id for the reducer to use
    }
);

export const unlikeVacation = createAsyncThunk(
    'likes/unlikeVacation',
    async (vacationId: string) => {
        await likeService.unlikeVacation(vacationId);
        return vacationId; // Return the id for the reducer to use
    }
);
