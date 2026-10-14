const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'demo');

test('demo page and core scripts exist', () => {
  for (const file of ['index.html', 'styles.css', 'scripts/modal.js', 'scripts/tabs.js', 'scripts/lazy-lottie.js']) {
    expect(fs.existsSync(path.join(root, file))).toBe(true);
  }
});

test('Lottie JSON placeholders parse and meet size budgets', () => {
  const limits = { hero: 120 * 1024, process: 30 * 1024, success: 20 * 1024 };
  for (const [name, limit] of Object.entries(limits)) {
    const file = path.join(root, 'assets', name + '.json');
    expect(() => JSON.parse(fs.readFileSync(file, 'utf8'))).not.toThrow();
    expect(fs.statSync(file).size).toBeLessThanOrEqual(limit);
  }
});

test('lead form is demo-only and does not post to a server', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  expect(html).toContain('this form does not send or store your details');
  expect(html).not.toMatch(/action=["'][^"']+["']/i);
});
