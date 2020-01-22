import axios from 'axios';

const urlPrefix = "https://api.opendota.com/api/teams"
const client = axios.create({
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
});

export const getTopTeams = async () => {
  const response = await client.get(urlPrefix);
  const teams = response.data;
  teams.sort((t1, t2) => t2.rating - t1.rating);
  return teams.slice(0, 16);
}
export const getPlayers = async (teamId) => {
  const response = await client.get(`${urlPrefix}/${teamId}/players`);
  return response.data;
}