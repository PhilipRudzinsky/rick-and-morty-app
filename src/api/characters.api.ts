import { CharacterApiResponse, CharacterModel as CharacterApiModel } from './models/character.api.model';
import { CharacterModel } from '../domain/models/character.model';

export const getCharacters = async (
    page: number,
    name?: string,
    status?: string,
    species?: string
): Promise<{ characters: CharacterModel[]; hasNextPage: boolean }> => {
    const params = new URLSearchParams({ page: page.toString() });
    if (name) params.append('name', name);
    if (status) params.append('status', status);
    if (species) params.append('species', species);

    const res = await fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch characters');

    const data = (await res.json()) as CharacterApiResponse;

    return {
        characters: data.results.map(({ id, name, status, species, image }) => ({
            id,
            name,
            status,
            species,
            image,
        })),
        hasNextPage: !!data.info.next,
    };
};

export const getCharacterById = async (id: number): Promise<CharacterApiModel> => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch character with ID ${id}`);

    return res.json();
};