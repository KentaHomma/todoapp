import React from 'react';
import { Team } from '../types/team-types';

interface TeamsSectionProps {
  teams: Team[];
}

const TeamsSection: React.FC<TeamsSectionProps> = ({ teams }) => {
  return (
    <div>
      {teams.map((team) => (
        <div key={team.name}>
          <img src={team.logo} alt={team.name} />
          <h3>{team.name}</h3>
          <p>Plan: {team.plan}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamsSection;

// src/types/team-types.ts
export interface Team {
  name: string;
  logo: string;
  plan: string;
};