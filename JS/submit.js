function initializeSubmitScript() {
document.getElementById('bilanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const rank = document.getElementById('rank').value;
    const verifications = parseInt(document.getElementById('verifications').value);
    const tickets = parseInt(document.getElementById('tickets').value);
    const messages = parseInt(document.getElementById('messages').value);
    const vocal = parseInt(document.getElementById('vocal').value);
    const bumps = parseInt(document.getElementById('bumps').value);
    const recruitments = parseInt(document.getElementById('recruitments').value);
    const buyers = parseInt(document.getElementById('buyers').value);
    const invitations = parseInt(document.getElementById('invitations').value);
    const tours = parseInt(document.getElementById('tours').value);
    const name = document.getElementById('name').value;

    let points = 0;
    let quota = 0;
    let colorEmbed = 0xFF0000;

    if (rank === 'Staff') {
        quota = 50;
        points = (verifications * 1.5) + (tickets * 5) + ((messages * 5) / 150) + ((vocal * 5) / 3) + (bumps * 1) + (recruitments * 15) + (buyers * 25) + (invitations * 5) + (tours * 0.5);
    } else if (rank === 'Haut Staff') {
        quota = 75;
        points = (verifications * 1) + (tickets * 5) + ((messages * 5) / 100) + ((vocal * 5) / 3) + (bumps * 1) + (recruitments * 10) + (buyers * 20) + (invitations * 5) + (tours * 0.5);
    } else if (rank === 'Cadres') {
        quota = 100;
        points = (verifications * 0.5) + (tickets * 3) + ((messages * 3) / 150) + ((vocal * 2) / 3) + (bumps * 1) + (recruitments * 5) + (buyers * 15) + (invitations * 3) + (tours * 0.5);
    } else if (rank === 'Direction') {
        quota = 125;
        points = (verifications * 0.1) + (tickets * 3) + ((messages * 3) / 200) + ((vocal * 1.5) / 3) + (bumps * 1) + (recruitments * 5) + (buyers * 10) + (invitations * 1) + (tours * 0.5);
    }

    points = points.toFixed(2);

    if (points >= quota) {
        colorEmbed = 0x00FF00;
    }

    const embed = {
        title: `Bilan pour ${name}`,
        fields: [
            { name: "Rank", value: rank, inline: true },
            { name: "Rôle", value: document.getElementById('role').value, inline: true },
            { name: "Vérifications publicitaires", value: verifications.toString(), inline: true },
            { name: "Gestion tickets", value: tickets.toString(), inline: true },
            { name: "Activité (messages)", value: messages.toString(), inline: true },
            { name: "Activité (vocal)", value: vocal.toString(), inline: true },
            { name: "Bump", value: bumps.toString(), inline: true },
            { name: "Recrutements", value: recruitments.toString(), inline: true },
            { name: "Trouver un acheteur", value: buyers.toString(), inline: true },
            { name: "Invitations", value: invitations.toString(), inline: true },
            { name: "Tournées Publicitaires", value: tours.toString(), inline: true }
        ],
        footer: {
            text: `Total Points: ${points}`
        },
        color: colorEmbed,
    };

    const webhookURL = localStorage.getItem('webhook');

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ embeds: [embed] })
    })
    .then(response => {
        if (response.ok) {
            alert("Formulaire soumis avec succès !");
            localStorage.clear()
            window.location.href = "./"
        } else {
            throw new Error('Une erreur s\'est produite lors de l\'envoi du formulaire.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erreur: ' + error.message);
    });
});


window.onload = function() {
    localStorage.clear()
};
}
