  const STORAGE_KEY = 'simple-todo';
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const input = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const list = document.getElementById('list');

    function save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function render() {
      list.innerHTML = '';
      tasks.forEach((task, i) => {
        const li = document.createElement('li');
        li.className = task.done ? 'completed' : '';
        li.innerHTML = `
          <span onclick="toggle(${i})">${task.text}</span>
          <button onclick="removeTask(${i})">✕</button>
        `;
        list.appendChild(li);
      });
      save();
    }

    function addTask() {
      const text = input.value.trim();
      if (!text) return;
      tasks.push({ text, done: false });
      input.value = '';
      render();
    }

    function toggle(i) {
      tasks[i].done = !tasks[i].done;
      render();
    }

    function removeTask(i) {
      tasks.splice(i, 1);
      render();
    }

    addBtn.addEventListener('click', addTask);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

    render();