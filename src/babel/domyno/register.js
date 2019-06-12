const submitForm = async () => {
    const playerName = document.getElementById('playerName').value;
    const fieldWidth = document.getElementById('fieldWidth').value;
    const fieldHeight = document.getElementById('fieldHeight').value;
    try {
        const result = await fetch('http://localhost:1700/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playerName,
                width: parseInt(fieldWidth),
                height: parseInt(fieldHeight)
            })
        });
        const json = await result.json();
        localStorage.setItem('game', JSON.stringify(json));
        window.location.href += 'game.html';
    } catch (e) {
        console.error(e.message);
    }
};