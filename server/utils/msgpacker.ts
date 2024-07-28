import { Packr } from 'msgpackr/pack'

export function usePacker(data: Array<Object>) 
{
    const packr = new Packr({ mapsAsObjects: true, variableMapSize: true });
    const packedData = packr.encode(data) 
    return packedData
}