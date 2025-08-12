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
    },
    update: async (id: string, dto: CreateFamiliarDto): Promise<Familiar> => {
        const res = await api.put<Familiar>(`/familiares/${id}`, dto);
        return res.data;
    },
    delete: async (id: string): Promise<string> => {
        const res = await api.delete(`/familiares/${id}`);
        return res.data;
    }
};