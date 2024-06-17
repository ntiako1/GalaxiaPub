function initializeFormScript() {
const rankDropdown = document.getElementById('rank');
const roleDropdown = document.getElementById('role');
const form = document.getElementById('bilanForm');
const formGroups = document.querySelectorAll('.form-group');
let currentGroupIndex = 0;

function showGroup(index) {
    formGroups.forEach((group, i) => {
        group.style.display = i === index ? '' : 'none';
    });
}

function updateRoleOptions() {
    const selectedRank = rankDropdown.value;
    const roles = rolesByRank[selectedRank];
    roleDropdown.innerHTML = '';
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
        const currentFormGroup = formGroups[currentGroupIndex];
        const requiredInputs = currentFormGroup.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value || input.value.trim() === '') { 
                isValid = false;
            }
        });

        if (isValid) {
            if (index < formGroups.length - 1) {
                currentGroupIndex++;
                showGroup(currentGroupIndex);
            }
        } else {
            alert('Veuillez remplir tous les champs obligatoires avant de passer à l\'étape suivante.');
            return; 
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

updateRoleOptions();
showGroup(currentGroupIndex);
}
