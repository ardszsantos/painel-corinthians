import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const LastMatches = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?team=131&last=5', {
          method: 'GET',
          headers: {
            'x-apisports-key': process.env.REACT_APP_API_KEY, // Utilizando a chave do .env
          },
        });

        const data = await response.json();

        console.log("Resposta da API:", data); // Verifica a estrutura da resposta da API

        setGames(data.response); // Verifique se o campo response contém os dados
      } catch (error) {
        console.error('Erro ao buscar os jogos:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="flex justify-center p-5 m-12  rounded-md bg-gray-500">
      <div className="w-full">
        <p className="text-white text-lg font-semibold mb-4">Últimas Partidas</p>
        <TableContainer component={Paper}>
          <Table aria-label="últimas partidas">
            <TableHead>
              <TableRow>
                <TableCell align="left">Data</TableCell>
                <TableCell align="left">Oponente</TableCell>
                <TableCell align="left">Placar</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.fixture.id}>
                  <TableCell align="left">{new Date(game.fixture.date).toLocaleDateString()}</TableCell>
                  <TableCell align="left">{game.teams.away.name} X {game.teams.home.name} </TableCell>
                  <TableCell align="left">{`${game.goals.home} - ${game.goals.away}`}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" href={`/detalhes/${game.fixture.id}`}>
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default LastMatches;
