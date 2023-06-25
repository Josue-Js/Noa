import { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/services/api";




export default async function handler(request: NextApiRequest, response: NextApiResponse) {

  const { query } = request.query

  if (request.method === 'GET') {

    const { data } = await  api.get('/search/multi', {
      params: {
        query: query,
        language: 'en-US',
        region: 'US'
      }
    })
    return response.status(200).json(data.results);
  }
}