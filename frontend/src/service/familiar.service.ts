import axios from "axios";
import type { CreateFamiliarDto, Familiar } from "../core/familiar.types";

const api = axios.create({baseURL: 'http://localhost:3000'});
export const familiarService = {
    getAll: async (): Promise<Familiar[]> => {
        const result = await api.get<Familiar[]>('/familiares');
        return result.data;
    },
    create: async (dto: CreateFamiliarDto): Promise<Familiar> => {
    const res = await api.post<Familiar>('/familiares', dto);
    return res.data;
    },
    getById: async (id: string): Promise<{ familiar: Familiar; descendentes: Familiar[] }> => {
        const res = await api.get<{ familiar: Familiar; descendentes: Familiar[] }>(`/familiares/${id}`);
        return res.data;
    }
};