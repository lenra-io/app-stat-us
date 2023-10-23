'use strict'

import { default as axios } from "axios";
    /**
     * Gets a document by id
     * @param {*} api The API call data
     * @param {string} coll The document collection
     * @param {string} id The data id
     * @returns {Promise<LenraData>}
     */
export async function getDoc(api, coll, id) {
    return (await axios.get(`${api.url}/app/colls/${coll}/docs/${id}`, options(api))).data;
}
    /**
     * Creates a document in a given collection
     * @param {*} api The API call data
     * @param {string} coll The document collection
     * @param {LenraData} doc The document to create
     * @returns {Promise<LenraData>}
     */
export async function createDoc(api, coll, doc) {
    return (await axios.post(`${api.url}/app/colls/${coll}/docs`, doc, options(api))).data;
}

/**
     * Updates a given document
     * @param {*} api The API call data
     * @param {string} coll The document collection
     * @param {LenraData} doc The document to save
     * @returns {Promise<LenraData>}
     */
export async function updateDoc(api, coll, doc) {
    return (await axios.put(`${api.url}/app/colls/${coll}/docs/${doc._id}`, doc, options(api))).data;
}
export function deleteDoc(api, coll, doc) {
    return axios.delete(`${api.url}/app/colls/${coll}/docs/${doc._id}`, options(api));
}

    /**
     * Executes a given query
     * @param {*} api The API call data
     * @param {string} coll The document collection
     * @param {*} query The query
     * @returns {Promise<LenraData[]>}
     */
export async function executeQuery(api, coll, query) {
    return (await axios.post(`${api.url}/app/colls/${coll}/docs/find`, query, options(api))).data;
}

function options(api) {
    return { headers: headers(api) }
}

function headers(api) {
    return { Authorization: `Bearer ${api.token}` }
}
