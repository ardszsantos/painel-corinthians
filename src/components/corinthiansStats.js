import React, { useEffect, useState } from 'react';

const TimaoStats = () => {
  const [team, setTeam] = useState(null); // Estado inicial nulo

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/teams?id=131', {
          method: 'GET',
          headers: {
            'x-apisports-key': process.env.REACT_APP_API_KEY,
          },
        });
        const data = await response.json();

        console.log('Resposta da API:', data); // Log para inspecionar a estrutura da resposta
        if (data && data.response && data.response[0]) {
          setTeam(data.response[0].team); // Garantindo que o time existe
        }
      } catch (error) {
        console.error('Erro ao buscar as informações do time:', error);
      }
    };

    fetchTeamData();
  }, []);

  // Verificação condicional para garantir que o time foi carregado
  if (!team) {
    return <p className="text-white">Carregando informações do time...</p>;
  }

  return (
    <div className="flex justify-center p-5 m-12 rounded-md bg-gray-500">
      <div className="text-center text-white">
        <img src={team.logo} alt={`${team.name} logo`} className="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-3xl font-bold">{team.name}</h2>
        <p className="text-lg mt-2">Fundado em: {team.founded}</p>
        <p className="text-lg mt-2">País: {team.country}</p>
        <p className="text-lg mt-2">Estádio: {team?.venue?.name || 'Informação indisponível'}</p>

      </div>
    </div>
  );
}

export default TimaoStats;
