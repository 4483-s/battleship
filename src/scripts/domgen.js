function gen(grid) {
  for (let i = 9; i >= 0; i--) {
    for (let j = 0; j < 10; j++) {
      const point = document.createElement('div');
      point.classList.add('empty');
      point.textContent = `${j},${i}`;
      grid.append(point);
    }
  }
}
