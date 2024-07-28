import { Unpackr } from 'msgpackr/unpack'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('unpack', (arrayBuffer) => {
    const buffer = new Uint8Array(arrayBuffer)
    const unpackr = new Unpackr({ mapsAsObjects: true, variableMapSize: true });
    const unpackedData = unpackr.decode(buffer)

    return unpackedData
  })
})