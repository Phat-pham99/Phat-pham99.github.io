import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchGitHubProjects } from './useGitHubProjects.js';

test('fetches every page and preserves GitHub languages, topics, and links', async (context) => {
  const firstPage = Array.from({ length: 100 }, (_, index) => ({ name: `repo-${index}`, language: 'Python' }));
  const lastPage = [{ name: 'react-app', html_url: 'https://github.com/example/react-app', language: 'TypeScript', topics: ['react', 'nestjs'], description: 'App', fork: true }];
  const requests = [];
  const controller = new AbortController();
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    requests.push(url);
    assert.equal(options.signal, controller.signal);
    assert.equal(options.headers.Accept, 'application/vnd.github+json');
    assert.equal(url.pathname, '/users/example/repos');
    assert.equal(url.searchParams.get('per_page'), '100');
    assert.equal(url.searchParams.get('type'), 'owner');
    return Response.json(url.searchParams.get('page') === '1' ? firstPage : lastPage);
  });

  const projects = await fetchGitHubProjects('example', { signal: controller.signal });
  assert.equal(projects.length, 101);
  assert.deepEqual(requests.map((url) => url.searchParams.get('page')), ['1', '2']);
  assert.deepEqual(projects[100], {
    repo: 'react-app', displayName: 'react-app', url: 'https://github.com/example/react-app',
    description: 'App', language: 'TypeScript', tech: ['react', 'nestjs'],
  });
  assert.deepEqual(projects[0].tech, []);
  assert.equal(projects[0].description, '');
});

test('handles an account with no public repositories', async (context) => {
  context.mock.method(globalThis, 'fetch', async () => Response.json([]));
  assert.deepEqual(await fetchGitHubProjects('example'), []);
});

test('rejects a rate-limited later page instead of returning an incomplete list', async (context) => {
  context.mock.method(globalThis, 'fetch', async (url) => url.searchParams.get('page') === '1'
    ? Response.json(Array.from({ length: 100 }, (_, index) => ({ name: `repo-${index}` })))
    : Response.json({ message: 'API rate limit exceeded' }, { status: 403 }));
  await assert.rejects(fetchGitHubProjects('example'), /HTTP 403/);
});

test('rejects an invalid API response', async (context) => {
  context.mock.method(globalThis, 'fetch', async () => Response.json({ unexpected: true }));
  await assert.rejects(fetchGitHubProjects('example'), /Invalid GitHub repository response/);
});

test('forwards cancellation to the request', async (context) => {
  const controller = new AbortController();
  controller.abort();
  context.mock.method(globalThis, 'fetch', async (_url, { signal }) => signal.throwIfAborted());
  await assert.rejects(fetchGitHubProjects('example', { signal: controller.signal }), { name: 'AbortError' });
});
