// Mitro Login System

// Master key for adding users (change this to your secure key)
const MASTER_KEY = 'admin123';

// Default users (stored in localStorage)
const DEFAULT_USERS = [
  { username: 'Rishabh', password: 'pass123', photo: '' },
  { username: 'Guest', password: 'guest', photo: '' }
];

// Initialize users from localStorage or use defaults
let users = JSON.parse(localStorage.getItem('mitroUsers')) || DEFAULT_USERS;

// Save users to localStorage
function saveUsers() {
  localStorage.setItem('mitroUsers', JSON.stringify(users));
}

// Get user initials for avatar
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Render user cards
function renderUserCards() {
  const container = document.getElementById('userCardsContainer');
  container.innerHTML = '';

  users.forEach((user, index) => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.dataset.index = index;

    const photoContainer = document.createElement('div');
    photoContainer.className = 'user-photo-container';

    if (user.photo) {
      const img = document.createElement('img');
      img.src = user.photo;
      img.alt = user.username;
      img.className = 'user-photo has-image';
      img.onerror = function() {
        // If image fails to load, show initials
        this.outerHTML = `<div class="user-photo">${getInitials(user.username)}</div>`;
      };
      photoContainer.appendChild(img);
    } else {
      const initials = document.createElement('div');
      initials.className = 'user-photo';
      initials.textContent = getInitials(user.username);
      photoContainer.appendChild(initials);
    }

    const name = document.createElement('div');
    name.className = 'user-name';
    name.textContent = user.username;

    card.appendChild(photoContainer);
    card.appendChild(name);

    card.addEventListener('click', () => openPasswordModal(index));

    container.appendChild(card);
  });
}

// Password Modal
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const modalUsername = document.getElementById('modalUsername');
const errorMessage = document.getElementById('errorMessage');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');

let currentUserIndex = null;

function openPasswordModal(index) {
  currentUserIndex = index;
  const user = users[index];
  
  modalUsername.textContent = user.username;
  passwordInput.value = '';
  errorMessage.textContent = '';
  
  passwordModal.classList.add('active');
  passwordInput.focus();
}

function closePasswordModal() {
  passwordModal.classList.remove('active');
  currentUserIndex = null;
  passwordInput.value = '';
  errorMessage.textContent = '';
}

function verifyPassword() {
  if (currentUserIndex === null) return;

  const user = users[currentUserIndex];
  const enteredPassword = passwordInput.value;

  if (enteredPassword === user.password) {
    // Successful login
    localStorage.setItem('mitroCurrentUser', JSON.stringify(user));
    
    // Redirect to main portfolio
    window.location.href = 'index.html';
  } else {
    // Wrong password
    errorMessage.textContent = 'Incorrect password. Please try again.';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// Event listeners for password modal
cancelBtn.addEventListener('click', closePasswordModal);
submitBtn.addEventListener('click', verifyPassword);

passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    verifyPassword();
  }
});

// Close modal on background click
passwordModal.addEventListener('click', (e) => {
  if (e.target === passwordModal) {
    closePasswordModal();
  }
});

// Add User Modal
const addUserModal = document.getElementById('addUserModal');
const addUserBtn = document.getElementById('addUserBtn');
const newUsername = document.getElementById('newUsername');
const newUserPassword = document.getElementById('newUserPassword');
const newUserPhoto = document.getElementById('newUserPhoto');
const masterKey = document.getElementById('masterKey');
const addUserErrorMessage = document.getElementById('addUserErrorMessage');
const addUserCancelBtn = document.getElementById('addUserCancelBtn');
const addUserSubmitBtn = document.getElementById('addUserSubmitBtn');

function openAddUserModal() {
  newUsername.value = '';
  newUserPassword.value = '';
  newUserPhoto.value = '';
  masterKey.value = '';
  addUserErrorMessage.textContent = '';
  
  addUserModal.classList.add('active');
  newUsername.focus();
}

function closeAddUserModal() {
  addUserModal.classList.remove('active');
  newUsername.value = '';
  newUserPassword.value = '';
  newUserPhoto.value = '';
  masterKey.value = '';
  addUserErrorMessage.textContent = '';
}

function addNewUser() {
  const username = newUsername.value.trim();
  const password = newUserPassword.value;
  const photo = newUserPhoto.value.trim();
  const key = masterKey.value;

  // Validation
  if (!username) {
    addUserErrorMessage.textContent = 'Please enter a username.';
    return;
  }

  if (!password) {
    addUserErrorMessage.textContent = 'Please enter a password.';
    return;
  }

  if (!key) {
    addUserErrorMessage.textContent = 'Please enter the master key.';
    return;
  }

  if (key !== MASTER_KEY) {
    addUserErrorMessage.textContent = 'Invalid master key.';
    masterKey.value = '';
    masterKey.focus();
    return;
  }

  // Check if username already exists
  if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
    addUserErrorMessage.textContent = 'Username already exists.';
    return;
  }

  // Add new user
  users.push({
    username: username,
    password: password,
    photo: photo
  });

  saveUsers();
  renderUserCards();
  closeAddUserModal();

  // Show success feedback (optional)
  alert(`User "${username}" added successfully!`);
}

// Event listeners for add user modal
addUserBtn.addEventListener('click', openAddUserModal);
addUserCancelBtn.addEventListener('click', closeAddUserModal);
addUserSubmitBtn.addEventListener('click', addNewUser);

// Close modal on background click
addUserModal.addEventListener('click', (e) => {
  if (e.target === addUserModal) {
    closeAddUserModal();
  }
});

// Handle Enter key in add user form
newUsername.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    newUserPassword.focus();
  }
});

newUserPassword.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    newUserPhoto.focus();
  }
});

newUserPhoto.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    masterKey.focus();
  }
});

masterKey.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addNewUser();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderUserCards();
});

// Export functions for debugging (optional)
window.mitroDebug = {
  getUsers: () => users,
  resetUsers: () => {
    users = [...DEFAULT_USERS];
    saveUsers();
    renderUserCards();
    console.log('Users reset to defaults');
  },
  addUser: (username, password, photo = '') => {
    users.push({ username, password, photo });
    saveUsers();
    renderUserCards();
    console.log(`User "${username}" added`);
  }
};
