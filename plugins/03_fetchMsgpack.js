
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('fetchMsgpack', async(route, queryParams) => {
        // Fetch data and receive data as buffer
        const buffer = await $fetch(route, { method: 'POST', headers: {Accept: 'application/octet-stream'}, responseType: 'arrayBuffer', query: queryParams})

        // Decode msgpack buffer and return decoded data
        const data = nuxtApp.$unpack(buffer)
        return data

    })    
})
