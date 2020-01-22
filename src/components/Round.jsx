import React from 'react';
import "./style.scss"

export default (teams) => (
  (
    <ul className={`round round-${teams.roundNumber}`}>
      {
        teams.teams.map((team, i) => {
          return (
            <React.Fragment key={i}>
              
              <li className="spacer">&nbsp;</li>
              <li className={`game game-${i % 2 === 0 ? 'top '  : 'bottom' }`} onClick={() => teams.selectTeam(team)}>{team.name}</li>
            </React.Fragment>
          )
        })
      }
      <li className="spacer">&nbsp;</li>
    </ul>
  )
)