import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const FirstSection = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null); // Store selected game details
  const [open, setOpen] = useState(false); // Control popup visibility
  const [players, setPlayers] = useState([]); // Store players
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Store selected player details
  const [playerModalOpen, setPlayerModalOpen] = useState(false); // Control player modal visibility

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?team=131&last=5', {
          method: 'GET',
          headers: {
            'x-apisports-key': process.env.REACT_APP_API_KEY,
          },
        });

        const data = await response.json();
        setGames(data.response); // Assuming the game data is in response
      } catch (error) {
        console.error('Erro ao buscar os jogos:', error);
      }
    };

    const fetchPlayers = async () => {
      try {
        // Replace this URL with the correct endpoint for fetching players
        const response = await fetch('https://v3.football.api-sports.io/players?team=131&season=2022', {
          method: 'GET',
          headers: {
            'x-apisports-key': process.env.REACT_APP_API_KEY,
          },
        });

        const data = await response.json();

        console.log('responsta: ', data)
        setPlayers(data.response); // Assuming the players data is in response
      } catch (error) {
        console.error('Erro ao buscar os jogadores:', error);
      }
    };

    fetchGames();
    fetchPlayers(); // Fetch players as well
  }, []);

  // Handle opening the game popup
  const handleClickOpen = (game) => {
    setSelectedGame(game); // Set the game details in state
    setOpen(true); // Open the popup
  };

  // Handle closing the game popup
  const handleClose = () => {
    setOpen(false); // Close the popup
    setSelectedGame(null); // Clear the selected game
  };

  // Handle opening the player popup
  const handlePlayerClickOpen = (player) => {
    setSelectedPlayer(player); // Set the player details in state
    setPlayerModalOpen(true); // Open the player modal
  };

  // Handle closing the player popup
  const handlePlayerModalClose = () => {
    setPlayerModalOpen(false); // Close the player modal
    setSelectedPlayer(null); // Clear the selected player
  };

  return (
    <div className="flex gap-5 text-center p-5 m-12 rounded-md bg-navBack-500">
      <div className="w-[50%]">
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
                  <TableCell align="left">
                    <span style={{ color: game.teams.home.winner ? 'green' : 'inherit' }}>
                      {game.teams.home.name}
                    </span>
                    {' X '}
                    <span style={{ color: game.teams.away.winner ? 'green' : 'inherit' }}>
                      {game.teams.away.name}
                    </span>
                  </TableCell>
                  <TableCell align="left">{`${game.goals.home} - ${game.goals.away}`}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(game)}>
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Popup for Game Details */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Detalhes do Jogo</DialogTitle>
          <DialogContent>
            {selectedGame ? (
              <div>
                <p><strong>Data:</strong> {new Date(selectedGame.fixture.date).toLocaleString()}</p>
                <p><strong>Casa:</strong> {selectedGame.teams.home.name}</p>
                <p><strong>Visitante:</strong> {selectedGame.teams.away.name}</p>
                <p><strong>Árbitro:</strong> {`${selectedGame.fixture.referee}`}</p>
                <p><strong>Estádio:</strong> {selectedGame.fixture.venue?.name || 'Indisponível'}</p>
                {/* Adicione mais detalhes que você deseja mostrar aqui */}
              </div>
            ) : (
              <p>Carregando...</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="w-[50%]">
        <p className="text-white text-lg font-semibold mb-4">Jogadores</p>
        <TableContainer component={Paper}>
          <Table aria-label="lista de jogadores">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Posição</TableCell>
                <TableCell align="left">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => (
                <TableRow
                  key={player.id}
                  onClick={() => handlePlayerClickOpen(player)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell align="left">{player.name}</TableCell>
                  <TableCell align="left">{player.position}</TableCell>
                  <TableCell align="left">{player.team.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Popup for Player Details */}
        <Dialog open={playerModalOpen} onClose={handlePlayerModalClose}>
          <DialogTitle>Detalhes do Jogador</DialogTitle>
          <DialogContent>
            {selectedPlayer ? (
              <div>
                <p><strong>Nome:</strong> {selectedPlayer.name}</p>
                <p><strong>Posição:</strong> {selectedPlayer.position}</p>
                <p><strong>Time:</strong> {selectedPlayer.team.name}</p>
                <p><strong>Idade:</strong> {selectedPlayer.age}</p>
                <p><strong>Nacionalidade:</strong> {selectedPlayer.nationality}</p>
                {/* Add more details as needed */}
              </div>
            ) : (
              <p>Carregando...</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePlayerModalClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default FirstSection;
