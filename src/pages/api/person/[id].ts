import { NextApiRequest, NextApiResponse } from "next";

import { api } from "@/services/api";
import { isNumeric } from "@/utils/isNumeric";



export default async function handler(request: NextApiRequest, response: NextApiResponse) {

  if (request.method != 'GET') {
    return response.status(400).json({ message: 'method not allow' });
  }

  const { id } = request.query;

  if (id && isNumeric(id)) {
    const { data } = await api.get(`/person/${id}`, {
      params: {
        append_to_response: 'movie_credits,external_ids'
      }
    });

    data.movie_credits.cast.sort((a, b) => b.popularity - a.popularity);

    return response.status(200).json(data)
  }
}