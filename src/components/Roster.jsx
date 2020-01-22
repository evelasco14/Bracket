import React, { useState, useEffect } from 'react';
import { getPlayers } from '../services/teamService';
import Paper from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';

export default (props) => {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async (teamId) => {
      const players = await getPlayers(teamId);
      setPlayers(players);
    }
    fetchData(props.team.team_id);
  }, [props.team.team_id]);

  const { team } = props;
  return (
    <Paper>
<Typography variant="h6">
      {team.name}
  </Typography>      
      <Typography variant="subtitle2">
        Roster:
        </Typography>
        <Typography variant="overline">
        {
          players.map((player, i) => (
            <div>
              {player.name}
            </div>
          ))
        }
      </Typography>
      </Paper>  );
}