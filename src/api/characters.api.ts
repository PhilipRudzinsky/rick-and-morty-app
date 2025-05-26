import { CharacterApiResponse, CharacterModel as CharacterApiModel } from './models/character.api.model';
import { CharacterModel } from '../domain/models/character.model';

export const getCharacters = async (
    page: number
): Promise<{ characters: CharacterModel[]; hasNextPage: boolean }> => {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
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