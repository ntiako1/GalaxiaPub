const rankDropdown = document.getElementById('rank');
const roleDropdown = document.getElementById('role');
const form = document.getElementById('bilanForm');
const formGroups = document.querySelectorAll('.form-group');
let currentGroupIndex = 0;

function showGroup(index) {
    formGroups.forEach((group, i) => {
        group.style.display = i === index ? 'flex' : 'none';
    });
}

function updateRoleOptions() {
    const selectedRank = rankDropdown.value;
    const roles = rolesByRank[selectedRank];
    roleDropdown.innerHTML = ''; // Réinitialise les options
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        roleDropdown.appendChild(option);
    });
}

rankDropdown.addEventListener('change', updateRoleOptions);

document.querySelectorAll('.next-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index < formGroups.length - 1) {
            currentGroupIndex++;
            showGroup(currentGroupIndex);
        }
    });
});

document.querySelectorAll('.prev-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index > 0) {
            currentGroupIndex--;
            showGroup(currentGroupIndex);
        }
    });
});

// Initialise les options du champ de rôle avec le premier rank
updateRoleOptions();
showGroup(currentGroupIndex);