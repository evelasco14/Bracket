import React, { useState, useEffect } from 'react';
import "./style.scss"
import { getTopTeams } from '../services/teamService';
import Round from './Round';
import Roster from './Roster';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
const determineWinners = (round) => {
  let j = 0;
  const nextRound = [];
  for (let i = 0; i < round.length; i += 2) {
    const coinFlip = Math.random() > 0.5;
    if (coinFlip) {
      nextRound[j] = round[i];
    } else {
      nextRound[j] = round[i + 1];
    }
    j++;
  }
  return nextRound;
}

export default () => {
  const [roundOne, setRoundOne] = useState([]);
  const [roundTwo, setRoundTwo] = useState([]);
  const [roundThree, setRoundThree] = useState([]);
  const [roundFour, setRoundFour] = useState([]);
  const [roundFive, setRoundFive] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const teams = await getTopTeams();
      const roundOne = [];
      let j = 0;
      for (let i = 0; i < teams.length / 2; i++) {
        roundOne[j] = teams[i];
        j++;
        roundOne[j] = teams[teams.length - 1 - i];
        j++;
      }
      const roundTwo = determineWinners(roundOne);
      const roundThree = determineWinners(roundTwo);
      const roundFour = determineWinners(roundThree);
      const roundFive = determineWinners(roundFour);

      setRoundOne(roundOne);
      setRoundTwo(roundTwo);
      setRoundThree(roundThree);
      setRoundFour(roundFour);
      setRoundFive(roundFive);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Grid container justify="center" alignItems="center"> 
        <Grid item>
          <Grid container>
       <Typography variant="h3"> Dota 2 World Championship</Typography>   
      </Grid> 
      </Grid>
      <Grid container justify="center" alignItems="center"> 
        <Grid item>   
      <Typography variant="h4"> Hosted by PlayVS </Typography>  
        </Grid> 
        </Grid>
        </Grid>   

      <main id="tournament">
      
        <Round
          selectTeam={setSelectedTeam}
          teams={roundOne}
          roundNumber={1}
        />
        <Round
          selectTeam={setSelectedTeam}
          teams={roundTwo}
          roundNumber={2}
        />
        <Round
          selectTeam={setSelectedTeam}
          teams={roundThree}
          roundNumber={3}
        />
        <Round
          selectTeam={setSelectedTeam}
          teams={roundFour}
          roundNumber={4}
        />
        <Round
          selectTeam={setSelectedTeam}
          teams={roundFive}
          roundNumber={5}
        />
        {
          selectedTeam && <Roster team={selectedTeam} />
        }
      </main>
    </div>
  );
}